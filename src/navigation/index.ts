import { createAppContainer } from 'react-navigation';

export * from './routes';
import mainNavigator from './mainNavigator';

export default createAppContainer(mainNavigator);
