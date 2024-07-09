import express from "express";

//import router for handiling tasks
import taskHandlerRouter from "./taskHandler";
import userRouter from "./user";
import authRouter from "./auth";

//creating router object
const router = express();

//route to handle tasks
router.use("/taskHandler", taskHandlerRouter);

//route to handle user
router.use("/user", userRouter);

//route to handle user authentication
router.use("/auth", authRouter);

// route for home
router.get("/", (req, res) => {
  res.json({
    msg: "Home",
  });
});
export default router;
