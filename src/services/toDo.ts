import { Service } from "typedi";
import { Types } from "mongoose";

import TodoController from "../dataModels/toDo";
import ToDo from "../models/toDo";
import { AddToDoInput, DeleteToDoInput,ShareToDoInput,UpdateToDoInput } from "../inputs/toDo";
import { Token } from "../inputs/token";

@Service()
export default class TodoService {
  constructor(private readonly toDoController: TodoController) {}

  public async getById(_id: Types.ObjectId): Promise<ToDo | null> {
    return this.toDoController.getById(_id);
  } 
  
  public async getByUser(token: Token): Promise<Array< ToDo> | null> {
    return this.toDoController.getByUser(token);
  }

  public async add(data: AddToDoInput,token:Token): Promise<ToDo | null>  {
    const newTodo = await this.toDoController.add(data,token);

    return newTodo;
  }

  public async update(data: UpdateToDoInput,token: Token): Promise<ToDo | null> {
    const updatedTodo = await this.toDoController.update(data,token);
    return updatedTodo;
  } 


  public async share(data:ShareToDoInput,token: Token):  Promise<ToDo | null>  {
    const sharedTodo = await this.toDoController.share(data,token);
    console.log(sharedTodo);
    
    return sharedTodo;
  }

  public async delete(data: DeleteToDoInput,token:Token): Promise<ToDo | null> {
    const deletedTodo = await this.toDoController.delete(data,token);
    return deletedTodo;
  }

}