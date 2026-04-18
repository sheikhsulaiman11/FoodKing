import jwt from "jsonwebtoken";

const createJWT = (data, res) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true, // Cannot be accessed via JS on the client
    maxAge: oneDay, // 1 day in milliseconds
    sameSite: "None", // Allows cross-site requests
    secure: true, // Required when using sameSite: "None"
  });

  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

export { createJWT, isTokenValid };