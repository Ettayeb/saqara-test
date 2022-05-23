import { Service } from "typedi";
import { Resolver, Arg, Query, Mutation} from "type-graphql";
import User from "../../../models/user";
import UserService from "../../../services/user";
import { SignUpInput, LoginInput } from "../../../inputs/auth";
import { LoggedInUser } from "../../../outputs/auth";


@Service() 
@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Any request related to the user other than auth things...

}