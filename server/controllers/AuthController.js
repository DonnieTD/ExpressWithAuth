import { DBINSTANCE } from "../db/mongoConnect";

const [bcrypt, jwt, AuthController] = [require("bcryptjs"),require("jsonwebtoken"),{}];

AuthController.CheckIfUserExists = async function (UsersCollection, UserName) {
  const [col,docs] = [DBINSTANCE.collection(UsersCollection) ,await col.find({ UserName }).toArray()];
  if (docs == false) throw "Invalid User";
  return docs;
};

AuthController.CheckPassword = async function (Password, UserObjectPassword, UserObj) {
  let passwordCheck = await bcrypt.compare(Password, UserObjectPassword);
  if (passwordCheck == false) throw "Invalid Password";
  return UserObj;
};

AuthController.MakeJWT = async function (payload, secret, encryptionObj) {
  let JWTCreationResponse = await jwt.sign(payload, secret, encryptionObj);
  if (JWTCreationResponse == false) throw "JWT ERROR";
  return JWTCreationResponse;
};

AuthController.Login = async function (UserName, Password) {
  const [UserObj,JWT] = [
    await this.CheckIfUserExists("Users", UserName),    
    await this.MakeJWT(await this.CheckPassword(Password,UserObj[0].Password,UserObj[0]), process.env.SECRET_KEY, {algorithm: "HS256"})
  ]

  return [JWT, UserObj];
};

AuthController.Register = async function (UsersCollection, UserName, Password) {
  try {
    return await DBINSTANCE.collection(UsersCollection).insertOne({ UserName, Password: bcrypt.hashSync(Password) })          
  } catch (err) {
    throw "User Exists";
  }
};


export default AuthController;
