import {
    Resolver,
    Arg,
    Query,
    Mutation,
    UseMiddleware,
    Ctx,
    FieldResolver,
    Root,
  } from "type-graphql";
  import { Service } from "typedi";
  import { Types } from "mongoose";
  
  import  ToDo  from "../../../models/toDo";
  import {isAuth}  from "../../middlewares/isAuth";

  import ToDoService from "../../../services/toDo";
  import {
    AddToDoInput,
    DeleteToDoInput,
    ShareToDoInput,
    UpdateToDoInput
  } from "../../../inputs/toDo";

  
  
  @Service() 
  @Resolver((of) => ToDo)
  export default class ToDoResolver {
    constructor(private readonly todoService: ToDoService) {}
  
    @Query((returns) => ToDo)
    async getById(@Arg("id") id: Types.ObjectId) {
      const todo = await this.todoService.getById(id);
  
      return todo;
    }
  
    @Query((returns) => [ToDo])
    @UseMiddleware(isAuth)
    async getToDosByUser(@Ctx() ctx: any): Promise<ToDo[] | null> {
      const toDos = await this.todoService.getByUser(ctx.payload);
      return toDos;
    }
  
    @Mutation((returns) => ToDo)
    @UseMiddleware(isAuth)
    async addToDo(
      @Arg("AddToDoInput") addToDoInput: AddToDoInput,@Ctx() ctx: any): Promise<ToDo | null> {
      const toDo = await this.todoService.add(addToDoInput, ctx.payload);  
      return toDo;
    }
  
    @Mutation((returns) => ToDo)
    @UseMiddleware(isAuth)
    async updateToDo(
      @Arg("UpdateToDoInput") updateToDoInput: UpdateToDoInput,
      @Ctx() ctx: any
    ): Promise<ToDo | null> {
      const toDo = await this.todoService.update(updateToDoInput,ctx.payload);
      return toDo;
    }
    
    @Mutation((returns) => ToDo)
    @UseMiddleware(isAuth)
    async shareToDo(@Arg("ShareToDoInput") shareToDoInput: ShareToDoInput,@Ctx() ctx: any) {
      const toDo = await this.todoService.share(shareToDoInput,ctx.payload);
  
      return toDo;
    }
  
    @Mutation((returns) => ToDo)
    @UseMiddleware(isAuth)
    async deleteToDo(
      @Arg("DeleteToDoInput") deleteToDoInput: DeleteToDoInput,
      @Ctx() ctx: any
    ): Promise<any> {
      const toDo = await this.todoService.delete(
        deleteToDoInput,
        ctx.payload
      );
      return toDo;
    }

  }