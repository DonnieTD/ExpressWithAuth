
import AuthController from "../../controllers/AuthController";
import { errorHandler } from "../../lib/error";

const [express,router,jwt] = [
  require("express"),
  express.Router(),
  require("jsonwebtoken")
];

router.post("/register", async function (req, res) {
  try {
    res.send(
      await AuthController.Register(
        "Users",
        req.body.Username,
        req.body.Password
      )
    );
  } catch (e) {
    res.status(400).send(errorHandler(e));
  }
});

router.post("/login", async function (req, res) {
  try {
    let LoginResponse = await AuthController.Login(
      req.body.Username,
      req.body.Password
    );

    res.cookie("token", LoginResponse[0], {
        expires: new Date(Date.now() + "10m"),
        secure: true, 
        httpOnly: true,
      })
      .send(LoginResponse[1]);
  } catch (e) {
    res.status(400).send(errorHandler(e));
  }
});

router.post("/verify", async function (req, res) {
  if (!req.cookies.token) {
    res.send(false);
  }

  try {
    const decrypt = await jwt.verify(
      req.cookies.token,
      process.env.SECRET_KEY
    );

    delete decrypt["iat"];

    res.send(decrypt);
  } catch (e) {
    res.send(false);
  }
  
});

router.post("/logout", async function (req, res) {
  const token = req.cookies.token;

  if (token) {
    res.clearCookie("token");
  }
  res.send(true);
});

module.exports = router;
