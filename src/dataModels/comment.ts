import { Service } from 'typedi';
import { getModelForClass } from "@typegoose/typegoose";
import { Types } from "mongoose";
import Comment from "../models/comment";
import { AddCommentInput } from "../inputs/comment";
import { Token } from "../inputs/token";


export const CommentModel = getModelForClass(Comment);

@Service()
export default class CommentController {

    async add(
        data: AddCommentInput,
        token: Token
      ): Promise<Comment | null> {

        const comment = await CommentModel.create({
          ...data,
          user: token._id,
        });
        return comment;
      }
    
  async getById(_id: Types.ObjectId): Promise<Comment | null> {
      const comment = await CommentModel.findById(_id).lean();
    return comment ;
  }

  async getByToDo(_id: Types.ObjectId): Promise< Array<Comment> | null> {
    const comments = await CommentModel.find({toDo : _id}).lean();
  return comments;
  }

}