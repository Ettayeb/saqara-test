import { Service } from "typedi";
import AuthController from "../dataModels/auth";
import { LoginInput, SignUpInput } from "../inputs/auth";
import {LoggedInUser } from "../outputs/auth";

@Service()
export default class UserService {
  constructor(private readonly authController: AuthController) {}

  public async signUp(data: SignUpInput): Promise<LoggedInUser> {
    const userRecord = await this.authController.signUp(data);

	// You can send an email here to the new user for the email verification...

    return userRecord;
  }

  public async logIn(data: LoginInput): Promise<LoggedInUser> {
    const userRecord = await this.authController.logIn(data);

    return userRecord;
  }
}

