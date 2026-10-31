import connectToDb from "@/lib/db";
import AgentChat from "@/models/AgentChat";

const MAX_MESSAGES = 60;
const MAX_ACTIVITY = 20;

export const getChatHistory = async (userId) => {
  await connectToDb();

  const chat = await AgentChat.findOne({ user: userId }).lean();

  return {
    messages: (chat?.messages || []).map((m) => ({
      role: m.role,
      text: m.text,
    })),
    activity: (chat?.activity || []).map((group) => ({
      prompt: group.prompt,
      actions: (group.actions || []).map((a) => ({
        tool: a.tool,
        args: a.args || {},
      })),
    })),
  };
};

export const saveChatTurn = async (userId, userText, reply, actions) => {
  await connectToDb();

  const push = {
    messages: {
      $each: [
        { role: "user", text: userText },
        { role: "assistant", text: reply },
      ],
      $slice: -MAX_MESSAGES,
    },
  };

  if (actions && actions.length > 0) {
    push.activity = {
      $each: [{ prompt: userText, actions }],
      $slice: -MAX_ACTIVITY,
    };
  }

  await AgentChat.findOneAndUpdate(
    { user: userId },
    { $push: push },
    { upsert: true }
  );
};

export const clearChatHistory = async (userId) => {
  await connectToDb();
  await AgentChat.deleteOne({ user: userId });
};