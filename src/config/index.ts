import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
 if (envFound.error) {
   // This error should crash whole process

   throw new Error("Couldn't find .env file");
 }

export default {

		/**
	 * Our NODE_ENV
	 */

	nodeEnv: process.env.NODE_ENV,
	/**
	 * Your favorite port
	 */
	port: process.env.PORT || 8080,

	/**
	 * db connection URI
	 */
	databaseURL: process.env.MONGODB_URI,

	/**
	 * Your secret key
	 */
	jwtSecret: process.env.JWT_SECRET,
		/**
	 * Algorithm used by jwt
	 */
	jwtAlgorithm: process.env.JWT_ALGORITHM,
	/**
	 * Used by winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
	/**
	 * API configs
	 */
	RestApi: {
		prefix: process.env.RESTAPI_PREFIX,
	},
		/**
	 * QRAPHQL configs
	 */
	graphql: {
		prefix: process.env.GRAPHQL_PREFIX,
	},

};
