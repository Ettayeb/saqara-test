import { Service } from "typedi";
import {
    Resolver,
    Arg,
    Ctx,
    Query,
    Mutation,
    UseMiddleware,
  } from "type-graphql";
  import { Types } from "mongoose";
  import Comment from "../../../models/comment";
  import CommentService from "../../../services/comment";
  import { AddCommentInput } from "../../../inputs/comment";
  import {isAuth} from "../../middlewares/isAuth";


  @Service()
  @Resolver((of) => Comment)
  export default class CommentResolver {
    constructor(private readonly CommentService: CommentService) {}
  
    @Mutation((returns) => Comment)
    @UseMiddleware(isAuth)
    async addComment(
      @Arg("addCommentInput") addCommentInput: AddCommentInput,
      @Ctx() ctx: any
    ): Promise<Comment | null> {
      const comment = await this.CommentService.add(
        addCommentInput,
        ctx.payload
      );
  
      return comment;
    }

    @Query((returns) => Comment)
    @UseMiddleware(isAuth)
    async getCommentById(@Arg("id") id: Types.ObjectId): Promise<Comment | null> {
      const comment = await this.CommentService.getById(id);
  
      return comment;
    }
  
    @Query((returns) => [Comment])
    @UseMiddleware(isAuth)
    async getCommentsByToDo(@Arg("id") id: Types.ObjectId) : Promise<Comment[] | null> {
      const comments = await this.CommentService.getByToDo(id);
      return comments;
    }
  
  }