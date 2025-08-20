import express from "express";
const router = express.Router();
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js";


router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;