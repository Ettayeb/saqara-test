import Container from "typedi";
import { Types } from "mongoose";
import { buildSchema } from "type-graphql";
import { ObjectIdScalar } from "./types";
import AuthResolver from "../resolvers/auth";
import ToDoResolver from "../resolvers/toDo";
import ComentResolver from "../resolvers/comment";
import UserResolver from "../resolvers/user";


export const buildGraphQlSchema = () =>
buildSchema({
    resolvers: [AuthResolver,ToDoResolver,ComentResolver,UserResolver],
    container: Container,
    scalarsMap: [{ type: Types.ObjectId, scalar: ObjectIdScalar }],
  });