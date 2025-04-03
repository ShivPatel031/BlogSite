import { Router } from "express";
import {
  refreshAccessToken,
  userLogin,
  userLogout,
  userRegister,
} from "../Controllers/auth.controller.js";

const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/logout", userLogout);

router.get("/refreshAccessToken", refreshAccessToken);

export default router;
