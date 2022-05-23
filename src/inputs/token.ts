import { Field, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class Token {
	@Field()
	readonly _id!: Types.ObjectId;

	@Field()
	@Length(3, 100)
	name: string;

	@Field()
	@Length(5, 50)
	@IsEmail()
	email: string;

	@Field()
	@Length(8, 8)
	exp: number;
}
