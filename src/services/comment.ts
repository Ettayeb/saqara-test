import { Service } from "typedi";
import { Types } from "mongoose";

import CommentController from "../dataModels/comment";
import Comment from "../models/comment";
import { AddCommentInput } from "../inputs/comment";
import { Token } from "../inputs/token";

@Service()
export default class CommentService {
  constructor(private readonly commentController:CommentController  ) {}

  public async add(data: AddCommentInput,token:Token): Promise<Comment | null>  {
    const comment = this.commentController.add(data,token);
    return comment;
  }

  public async getById(_id: Types.ObjectId): Promise<Comment | null> {
    return this.commentController.getById(_id);
  } 
  
  public async getByToDo(_id: Types.ObjectId): Promise<Array<Comment> | null> {
    return this.commentController.getByToDo(_id);
  }


}