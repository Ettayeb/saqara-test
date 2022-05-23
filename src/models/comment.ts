import { ObjectType, Field } from "type-graphql";
import { prop,Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import User from "./user";
import ToDo from "./toDo";


@ObjectType()
export default class Comment {
  @Field()
  readonly _id!: Types.ObjectId;

  @prop({ default: Date.now() })
  @Field(() => Date)
  createdAt!: Date;

  @prop({ default: Date.now() })
  @Field(() => Date)
  updatedAt!: Date;

  @prop()
  @Field()
  text!: string;

  @Field(type => ToDo)
  @prop({ ref: ToDo })
  toDo: Ref<ToDo>;

  @Field(type => User)
  @prop({ ref: User })
  user: Ref<User>;

}