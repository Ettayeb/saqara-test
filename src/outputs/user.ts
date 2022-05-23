import { ObjectType, Field } from "type-graphql";

import { Types } from "mongoose";

@ObjectType()
export class UserOutput {

  @Field()
  readonly _id!: Types.ObjectId;

  @Field()
  name!: string;

  @Field()
  email!: string;

}