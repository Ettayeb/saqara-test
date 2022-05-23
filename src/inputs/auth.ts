import { Field, InputType } from "type-graphql";
import { Length,IsEmail } from "class-validator";

@InputType()
export class SignUpInput {
  @Field()
  @Length(3,100)
  name: string;

  @Field()
  @Length(5,50)
  @IsEmail()
  email: string;

  @Field()
  @Length(6,50)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @Length(5,50)
  @IsEmail()
  email: string;

  @Field()
  @Length(6,50)
  password: string;

}