import { Service } from 'typedi';
import UserModel from '../dataModels/user';

@Service()
export default class UserService {
	constructor(private readonly userModel: UserModel) {}

	// Everything related to the user management other than the auth goes here...
}
