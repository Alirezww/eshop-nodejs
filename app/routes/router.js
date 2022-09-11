const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { SupportSectionRouter } = require("./support/support.router");
const { userAuthRoutes } = require("./user/auth");

const router = require("express").Router();

router.use("/admin", AdminRoutes)
router.use("/user", userAuthRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/support", SupportSectionRouter);
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes : router
};