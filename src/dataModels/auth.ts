import { Inject,Service } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from '../config';
import { UserModel } from "../dataModels/user";
import { SignUpInput,LoginInput } from "../inputs/auth";
import { LoggedInUser } from "../outputs/auth";

import User from "../models/user";


@Service()
export default class AuthController {

    constructor(
		@Inject('logger') private logger
	) {}

  async signUp(signUpInput: SignUpInput): Promise<LoggedInUser | null> {
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword: string = bcrypt.hashSync(signUpInput.password, salt);
    const userRecord = await UserModel.create({
        ...signUpInput,
        salt: salt.toString(),
        password: hashedPassword,
    });

    const token = this.generateToken(userRecord);

    if (!userRecord) {
        throw new Error('User cannot be created');
    }

    return {"user": {_id: userRecord._id, name: userRecord.name,email: userRecord.email} , token };
  }

  async logIn(loginInput: LoginInput): Promise<LoggedInUser | null> {

    // Many impliment passport.js but I really don't see any need for it.

    const userRecord = await UserModel.findOne({ email: loginInput.email });
    if (!userRecord) {
      throw new Error("This email doesn't match an account.");
    }

     this.logger.silly('Checking password');
     const validPassword = await bcrypt.compare(loginInput.password, userRecord.password);
     this.logger.debug('Validation : %o', validPassword);
     if (validPassword) {
         this.logger.silly('Password is valid!');
         this.logger.silly('Generating JWT');
         const token = this.generateToken(userRecord);

         return {"user": {_id: userRecord._id, name: userRecord.name,email: userRecord.email} , token };

        } else {
         throw new Error('Invalid Password');
     }
      }



  private generateToken(user:User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for user: ${user._id}`);
    return jwt.sign(
        {
            _id: user._id, // Used by the middleware 'isAuth'
            name: user.name,
            exp: exp.getTime() / 1000,
        },
        config.jwtSecret,
    );
}
}