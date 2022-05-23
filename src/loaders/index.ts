import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import apolloLoader from './apollo';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB loaded and connected!');

  const apollo = await apolloLoader({ app: expressApp });

  await dependencyInjector();

  Logger.info('Dependency Injector loaded');

   expressLoader({ app: expressApp });
  Logger.info('Express loaded');



  Logger.info('Server fully loaded');

};
