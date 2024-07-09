import express from 'express';
import * as AuthController from "../controllers/auth"

const router = express();

router.post("/login", AuthController.login);


router.post("/refreshAccessToken", AuthController.refreshAccessToken);

export default router;