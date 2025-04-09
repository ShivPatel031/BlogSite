import { Router } from "express";
import {
  refreshAccessToken,
  searchAccount,
  updateProfileData,
  updateProfileImage,
  userLogin,
  userLogout,
  userRegister,
} from "../Controllers/auth.controller.js";
import { upload } from "../Middleware/multerConfig.js";


const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/logout", userLogout);

router.get("/refreshAccessToken", refreshAccessToken);

router.post("/search-accouts", searchAccount);

router.post(
  "/update-profile-image",
  upload.single("profileImage"),
  updateProfileImage
);

router.post("/update-profile-data", updateProfileData);


export default router;
