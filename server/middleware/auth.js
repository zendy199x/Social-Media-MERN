import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
