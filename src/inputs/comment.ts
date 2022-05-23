import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Types } from "mongoose";


@InputType()
export class AddCommentInput {
  @Field()
  @Length(1,1000)
  text: string;

  @Field()
  toDo: Types.ObjectId;

}