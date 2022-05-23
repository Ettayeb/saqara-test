import { ObjectType, Field } from "type-graphql";
import { prop,Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import User from "./user";


@ObjectType()
export default class ToDo {
  @Field()
  readonly _id!: Types.ObjectId;

  @prop({ required: true })
  @Field()
  title: string;

  @prop({ required: true })
  @Field()
  content: string;

  @prop({ default: true })
  @Field()
  done: boolean;

  @Field(type => User)
  @prop({ ref: User })
  user: Ref<User>;

  @prop({ default: Date.now() })
  @Field(() => Date)
  createdAt!: Date;

  @prop({ default: Date.now() })
  @Field(() => Date)
  updatedAt!: Date;

}