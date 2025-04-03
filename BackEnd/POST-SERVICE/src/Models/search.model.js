import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
  title: { type: String, required: true, index: "text" }, // Full-text search
  slug: { type: String, required: true, unique: true }, // SEO-friendly URL
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Link to User
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }, // Link to post
  authorName: { type: String, required: true },
  tags: [{ type: String, index: true }], // Faster filtering
  createdAt: { type: Date, default: Date.now },
  imageUrl: { types: String },
});

// Enable full-text search on title and summary
SearchSchema.index({ title: "text", summary: "text" });

export const Search = mongoose.model("Search", SearchSchema);
