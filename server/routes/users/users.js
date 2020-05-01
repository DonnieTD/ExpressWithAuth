
import AuthController from "../../controllers/AuthController";

const [express,jwt] = [ require("express"),require("jsonwebtoken")];

const router =  express.Router();

router.post("/register", async function (req, res) {
    res.send(await AuthController.Register("Users",req.body.Username,req.body.Password));
});

router.post("/login", async function (req, res) {
    let LoginResponse = await AuthController.Login(req.body.Username,req.body.Password);
    res.cookie("token", LoginResponse[0], {expires: new Date(Date.now() + "10m"),secure: true, httpOnly: true}).send(LoginResponse[1]);
});

router.post("/verify", async function (req, res) {
  if (!req.cookies.token) res.send(false);

  const decrypt = await jwt.verify(req.cookies.token,process.env.SECRET_KEY);
  delete decrypt["iat"];
  res.send(decrypt);
  
});

router.post("/logout", async function (req, res) {
  const token = req.cookies.token;

  if (token) res.clearCookie("token");
  
  res.send(true);
});

module.exports = router;
