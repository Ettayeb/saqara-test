import mongoose from 'mongoose';
import { UserModel } from '../src/dataModels/user';
import { ToDoModel } from '../src/dataModels/toDo';
import { CommentModel } from '../src/dataModels/comment';
import config from '../src/config';

// mongoose.Promise = global.Promise;

export const cleanDB = async () => {
	await UserModel.deleteMany({});
	await ToDoModel.deleteMany({});
	await CommentModel.deleteMany({});
	return;
};

export const connectToDB = async () => {
	const MongoConnect = await mongoose.connect(config.databaseURL);
	return MongoConnect.connection.db;
};

export const disconnectDB = async (cb = () => {}) => {
	return await mongoose.connection.close();
};
