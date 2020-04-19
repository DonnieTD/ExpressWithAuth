const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get the dbInstance
import { DBINSTANCE } from "../lib/mongoConnect";

const AuthController = {
  CheckIfUserExists: async function (UsersCollection, UserName) {
    const col = DBINSTANCE.collection(UsersCollection);

    const docs = await col.find({ UserName }).toArray();

    if (docs == false) {
      throw "Invalid User";
    }
    return docs;
  },

  CheckPassword: async function (Password, UserObjectPassword, UserObj) {
    let passwordCheck = await bcrypt.compare(Password, UserObjectPassword);

    if (passwordCheck == false) throw "Invalid Password";

    return UserObj;
  },

  MakeJWT: async function (payload, secret, encryptionObj) {
    let JWTCreationResponse = await jwt.sign(payload, secret, encryptionObj);

    if (JWTCreationResponse == false) throw "JWT ERROR";

    return JWTCreationResponse;
  },

  Login: async function (UserName, Password) {
    let JWT;
    let UserObj = await this.CheckIfUserExists("Users", UserName);
    let JWTPayload = await this.CheckPassword(
      Password,
      UserObj[0].Password,
      UserObj[0]
    );

    JWT = await this.MakeJWT(JWTPayload, process.env.SECRET_KEY, {
      algorithm: "HS256",
    });

    return [JWT, UserObj];
  },

  Register: async function (UsersCollection, UserName, Password) {
    const col = DBINSTANCE.collection(UsersCollection);

    try {
      const response = await col.insertOne({
        UserName,
        Password: bcrypt.hashSync(Password),
      });

      return response;
    } catch (err) {
      throw "User Exists";
    }
  },
};

export default AuthController;
