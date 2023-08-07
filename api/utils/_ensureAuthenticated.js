import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ensureAuthenticated = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token || token == "undefined") {
      throw new Error("No token provided");
    }

    if (req.body.playerId == undefined) {
      throw new Error({ error: "No playerId provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        if (err.name === "TokenExpiredError") {
          // Token is expired, generate a new token
          const newToken = jwt.sign(
            { id: req.body.playerId },
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
          throw new Error({
            message: "Failed to authenticate token",
            details: err,
          });
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
