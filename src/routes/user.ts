import express from "express";
import { createUser, getUserById } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = express();

router.get("/getUserById/:id", auth, getUserById);

router.post("/createUser", createUser);

export default router;
