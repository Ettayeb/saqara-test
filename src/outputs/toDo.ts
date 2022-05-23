import { Field, ObjectType } from "type-graphql";
import { Types } from "mongoose";

@ObjectType()
export class TodoOutput {
  @Field()
  readonly _id!: Types.ObjectId;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  user: Types.ObjectId;
}