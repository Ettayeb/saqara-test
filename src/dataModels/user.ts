import { Inject,Service } from 'typedi';
import { getModelForClass } from "@typegoose/typegoose";
import User from "../models/user";


export const UserModel = getModelForClass(User);

@Service()
export default class UserController {

    constructor(
		@Inject('logger') private logger
	) {}

    // user related methods goes here...

}