import jwt from 'jsonwebtoken';

//TODO: but this function in every other micro
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          res.locals.userId = decodedToken.id;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };