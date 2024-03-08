import express from "express";
const router = express.Router();
import {
  authEmail,
  githubRedirect,
  googleRedirect,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { validateRequest } from "../middleware/index.js";
import { createUserSchema } from "../schemas/user/index.js";

router.post("/email", validateRequest(createUserSchema), authEmail);

// OAuth Authentication, Just going to this URL will open OAuth screens
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

// Oauth user data comes to these redirectURLs
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleRedirect
);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  githubRedirect
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
