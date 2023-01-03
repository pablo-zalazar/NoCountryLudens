import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error("No jwt");
      return res.status(400).json({ msg: error.message });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userID = decoded.id;
      req.admin = decoded.admin;

      return next();
    } catch (e) {
      return res.status(400).json({ msg: "Invalid jwt" });
    }
  }
  if (!token) {
    const error = new Error("Not authorization header");
    return res.status(400).json({ msg: error.message });
  }
};

export default checkAuth;
