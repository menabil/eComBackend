// require('node:dns').setServers(['1.1.1.1'],['8.8.8.8'])
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDb = require("./config/mongoDb");
const { swaggerUI, specs } = require("./config/swagger");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const vendorRoute = require("./routes/vendorRoute");
const {
  adminMiddleware,
  vendorMiddleware,
  userMiddleware,
} = require("./middlewares/roleMiddleware");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const app = express();

app.use(express.json());
app.use(cors());
mongoDBConfig();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userMiddleware, userRouter);
app.use("/api/v1/admin", adminMiddleware, adminRouter);
app.use("/api/v1/vendor", vendorMiddleware, vendorRouter);

const port = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server is running on port: ${port}`);
});
