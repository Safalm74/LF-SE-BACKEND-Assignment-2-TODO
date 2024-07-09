import express from "express";
import { createUser, getUserById } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = express();

//Route to get user by id
router.get("/getUserById/:id", auth, getUserById);

//Route to add user
router.post("/createUser", createUser);

export default router;
