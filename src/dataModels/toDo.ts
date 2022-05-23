import { Service } from 'typedi';
import { getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import ToDo from "../models/toDo";
import {
  AddToDoInput,
  DeleteToDoInput,
  ShareToDoInput,
  UpdateToDoInput
} from "../inputs/toDo";

import { Token } from "../inputs/token";
import { UserModel } from "./user";
import { CommentModel } from './comment';

export const ToDoModel = getModelForClass(ToDo);

@Service()
export default class TodoModel {

  async getById(_id: Types.ObjectId): Promise<ToDo | null> {
      const toDo = await ToDoModel.findById(_id).lean()
    return toDo;
  }

  async getByUser(token: Token): Promise<Array<ToDo> | null> {
      const toDos = await ToDoModel.find({user: token._id}).lean();
    return toDos;
  }

  async add(
    data: AddToDoInput,
    token: Token
  ): Promise<ToDo | null> {
    const toDo = await ToDoModel.create({...data,user: token._id});
    return toDo;
  }

  async update(data: UpdateToDoInput,token: Token): Promise<ToDo | null> {
    const toDo = await ToDoModel.findOne({ _id: data._id, user: token._id });
    if (toDo) {

        data.title ? toDo.title = data.title : null;
        data.content ? toDo.content = data.content : null;
        data.done ? toDo.done = data.done : null;

      await toDo.save();
    } else {
      throw new Error("Either ToDo doesn't exist or you are not an owner!");
    }

    return toDo.toObject();
  }

  async share(data: ShareToDoInput,token: Token): Promise<ToDo | null> {
    const toDo = await ToDoModel.findOne({ _id: data.toDo,user: token._id });
    const user = await UserModel.findOne({ _id: data.user });
    if (!toDo) {
      throw new Error("Either ToDo doesn't exist or you are not an owner!");
    }
    if (!user) {
      throw new Error("The user you want to share with does't exist!");
    }
    toDo.user = user._id;
    await toDo.save();
    return toDo.toObject();
  }

  async delete(
    data: DeleteToDoInput,
    token: Token
  ): Promise<ToDo | null> {
    const toDo = await ToDoModel.findOne({ _id: data._id });

    if (toDo) {
      if (toDo.user != token._id) {
        throw new Error("Action not allowed!");
      } else {
        await ToDoModel.deleteOne({ _id: data._id });
        await CommentModel.deleteMany({ toDo: data._id });
      }
    } else {
      throw new Error("Todo doesn't exist");
    }

    return toDo;
  }

}