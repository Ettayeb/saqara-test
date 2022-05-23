import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

@ObjectType()
export default class User {
  @Field()
  readonly _id!: Types.ObjectId;

  @prop({required: true})
  @Field()
  name!: string;

  @prop({ unique: true,lowercase: true,index: true })
  @Field()
  email!: string;

  @prop({required: true})
  @Field()
  password!: string;

  @prop({required: true})
  @Field()
  salt!: string;

  @prop({ default: Date.now() })
  @Field(() => Date)
  createdAt!: Date;

  @prop({ default: Date.now() })
  @Field(() => Date)
  updatedAt!: Date;


}