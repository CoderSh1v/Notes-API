import "dotenv/config";

import jwt from "jsonwebtoken";

export function jwtAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  // 1. Check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
    }
    
    // 2. Extract token
    const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.Secret_Key);

    // 4. Attach identity
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    // 5. Invalid or expired token
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
}
