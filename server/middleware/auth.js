import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // get the token form the frontend
    let token = req.header("authontication");

    if (!token) return res.status(403).send("Acces Denied!");

    // remove the bearer keyword from the token head
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimleft();
    }

    // verify the token using the secret string
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    // send the error message from the database
    res.status(500).json({ error: err.message });
  }
};

// next function used in middlewares to spesifie the the end of current process
