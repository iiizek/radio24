import { InteractionManager } from 'react-native';

export const safelyRunOnUI = (callback) => {
	InteractionManager.runAfterInteractions(callback);
};
