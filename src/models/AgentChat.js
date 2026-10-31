import mongoose from "mongoose";
import "@/models/User";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const actionSchema = new mongoose.Schema(
  {
    tool: { type: String },
    args: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    prompt: { type: String },
    actions: [actionSchema],
  },
  { _id: false }
);

const agentChatSchema = new mongoose.Schema(
  {
    // Ek user ki ek hi chat
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    messages: [messageSchema],
    activity: [activitySchema],
  },
  { timestamps: true }
);

const AgentChat =
  mongoose.models.AgentChat || mongoose.model("AgentChat", agentChatSchema);

export default AgentChat;