import { ObjectType, Field } from "type-graphql";

import { UserOutput } from "./user";


@ObjectType()
export class LoggedInUser {

    @Field(() => UserOutput)
    user: UserOutput;
 
    @Field()
    token: string;

}