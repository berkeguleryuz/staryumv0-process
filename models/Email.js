import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// eğer yoksa oluştur
export default mongoose.models.Post || mongoose.model("Post", postSchema);