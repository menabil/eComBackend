require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRouter");
const vendorRouter = require("./routes/vendorRouter");
const mongoDBConfig = require("./config/mongoDBConfig");
const {
  adminMiddleware,
  vendorMiddleware,
  userMiddleware,
} = require("./middlewares/roleMiddleware");
const app = express();

app.use(express.json());
mongoDBConfig();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userMiddleware, userRouter);
app.use("/api/v1/admin", adminMiddleware, adminRouter);
app.use("/api/v1/vendor", vendorMiddleware, vendorRouter);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is running on port: ${port}`);
});
