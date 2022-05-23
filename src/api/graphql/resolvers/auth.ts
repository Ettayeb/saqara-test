import { Service } from "typedi";
import { Resolver, Arg, Query, Mutation} from "type-graphql";
import User from "../../../models/user";
import AuthService from "../../../services/auth";
import { SignUpInput, LoginInput } from "../../../inputs/auth";
import { LoggedInUser } from "../../../outputs/auth";


@Service() 
@Resolver((of) => User)
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => LoggedInUser)
  async signUp( @Arg("SignUp") signUpInput: SignUpInput): Promise<LoggedInUser> {
    const user = await this.authService.signUp(signUpInput);
    return user;
  }

  @Query((returns) => LoggedInUser)
  async logIn(@Arg("logIn") loginInput: LoginInput): Promise<LoggedInUser> {

    const user = await this.authService.logIn(loginInput);
    return user;
  }
}