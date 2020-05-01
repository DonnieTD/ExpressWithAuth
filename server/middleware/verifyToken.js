const [ jwt , verifyToken ] = [
  require("jsonwebtoken"),
  async (req, res, next) => {
      if (!req.cookies.token) return res.status(401).json("You need to Login");
  
      const decrypt = await jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  
      req.user = {UserName: decrypt.UserName,};
      next();
  }
];

module.exports = verifyToken;
