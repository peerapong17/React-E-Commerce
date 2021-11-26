import JWT from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      message: "unauthorized",
    });
  } else {
    token = token.split(" ")[1];

    try {
      const user = JWT.verify(token, process.env.JWT_SECRET);

      req.user = user.id;
      next();
    } catch (error) {
      return res.status(403).json({
        errors: [
          {
            msg: "unauthorized",
          },
        ],
      });
    }
  }
};
