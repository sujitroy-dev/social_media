import express from "express";
const router = express.Router();
import { authEmail, googleRedirect } from "../controllers/auth.controller.js";
import passport from "passport";

router.post("/email", authEmail);

// OAuth Authentication, Just going to this URL will open OAuth screens
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Oauth user data comes to these redirectURLs
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleRedirect
);

// This url will only open, if the user is signed in
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(`Wellcome user ${req.user.email}`);
  }
);

export default router;
