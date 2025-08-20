import express from "express";
const router = express.Router();
import { getPosts, getPost, addPost, updatePost, deletePost, getPostsByUserId } from "../controllers/post.js";

router.get("/", getPosts);
router.post("/", addPost);
router.get("/user/:id", getPostsByUserId); // đặt trước :id
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;