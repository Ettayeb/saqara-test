import { Container } from 'typedi';
import LoggerInstance from './logger';

export default () => {
	try {
		
		// Inject anything needed here

		Container.set('logger', LoggerInstance);
		LoggerInstance.info('Logger injected into container');

		return;
	} catch (e) {
		LoggerInstance.error('Error on dependency injector loader: %o', e);
		throw e;
	}
};