import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ensureAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token is expired, generate a new token
          const newToken = jwt.sign(
            { id: req.userId },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          // Attach the new token to the response header
          res.set("x-access-token", newToken);

          // Save the new token to request for use in other routes
          req.userId = decoded.id;
          next();
        } else {
          return res
            .status(500)
            .json({ error: "Failed to authenticate token" });
        }
      } else {
        // If token is valid, save to request for use in other routes
        req.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error authenticating token", details: error });
  }
};
export default ensureAuthenticated;
