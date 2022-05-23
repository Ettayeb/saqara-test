import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Types } from "mongoose";


@InputType()
export class AddToDoInput {
    @Field()
    @Length(1,200)
    title: string;
  
  
  @Field()
  @Length(1,500)
  content: string;

}
@InputType()
export class UpdateToDoInput {
    @Field()
    _id: Types.ObjectId;
  
    @Field()
    @Length(1,200)
    title: string;

  @Field()
  @Length(1,1000)
  content: string;

  @Field()
  done: boolean;

}


@InputType()
export class DeleteToDoInput {
  @Field()
  _id: Types.ObjectId;
}


@InputType()
export class ShareToDoInput {


  @Field()
  toDo: Types.ObjectId;

  @Field()
  user: Types.ObjectId;
}