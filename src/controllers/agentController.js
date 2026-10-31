import { runCourseAgent } from "@/services/agentService";
import {
  getChatHistory,
  saveChatTurn,
  clearChatHistory,
} from "@/services/chatHistoryService";

export const agentChatController = async (userId, text) => {
  const history = await getChatHistory(userId);

  // AI ko sirf aakhri 12 messages bhejte hain
  const messages = [...history.messages, { role: "user", text }].slice(-12);

  while (messages.length > 0 && messages[0].role !== "user") {
    messages.shift();
  }

  const result = await runCourseAgent(userId, messages);

  // Agent chal gaya tabhi save hoga
  await saveChatTurn(userId, text, result.reply, result.activity);

  return result;
};

export const getHistoryController = async (userId) => {
  return await getChatHistory(userId);
};

export const clearHistoryController = async (userId) => {
  await clearChatHistory(userId);
};