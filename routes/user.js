import express from "express";
import passport from "passport";
import { getAdminStats, getAdminUsers, logout, myProfile } from "../controllers/user.js";
import { authorizeAdmin, isauthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/googlelogin",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get(
    "/login",
    passport.authenticate("google", {
        successRedirect: process.env.FRONTEND_URL,
    })
);

router.get("/me", isauthenticated, myProfile);

router.get("/logout", logout);

//Admin Routes
router.get("/admin/users", isauthenticated, authorizeAdmin, getAdminUsers);
router.get("/admin/stats", isauthenticated, authorizeAdmin, getAdminStats);

export default router;