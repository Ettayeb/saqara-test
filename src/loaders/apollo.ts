import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildGraphQlSchema } from '../api/graphql/schema';
import config from '../config';

export default async ({ app }: { app: express.Application }) => {
	const schema = await buildGraphQlSchema();

	const dev = config.nodeEnv === 'development';
	const apollo = new ApolloServer({
		schema,
		playground: dev,
		context: ({ req, res }) => ({ req, res }),
	});

	await apollo.start();

	apollo.applyMiddleware({
		app,
		path: config.graphql.prefix,
	});
};
