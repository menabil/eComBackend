const jwt = require("jsonwebtoken");

let adminMiddleware = async (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

let vendorMiddleware = async (req, res, next) => {
  let authorizationToken = req.headers.authorization;

  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (decoded.role !== "vendor") {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

let userMiddleware = async (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    return res.status(401).json({
      success: false,
      message: "You are not login",
    });
  }
  let token = authorizationToken.split(" ")[1];

  let decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "You are not login",
    });
  } else {
    next();
  }
};

module.exports = { adminMiddleware, vendorMiddleware, userMiddleware };
