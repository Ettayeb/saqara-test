import { Container } from "typedi"
import LoggerInstance from '../src/loaders/logger';
import { graphql } from "graphql"
import { buildGraphQlSchema } from "../src/api/graphql/schema";
import { UserModel } from "../src/dataModels/user";
import { ToDoModel } from "../src/dataModels/toDo";
import { CommentModel } from "../src/dataModels/comment";

export const runQuery = async (query: string, variables: any, ctx : any) => {

  Container.set({ id: "USER", factory: () => UserModel })
  Container.set({ id: "TODO", factory: () => ToDoModel })
  Container.set({ id: "COMMENT", factory: () => CommentModel })
  Container.set('logger', LoggerInstance);

  const schema = await buildGraphQlSchema();

  return graphql(schema, query,null,{req: {headers: ctx}}, variables)
}