import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainScreen from './pages/MainScreen';

import Product from './pages/Product';

const mainNavigation = createStackNavigator(
  {
    MainScreen,
    Product,
  },
  {
    defaultNavigationOptions: {
      headerLayoutPreset: 'center',
      headerTitleStyle: {
        color: 'white',
        fontFamily: 'OpenSans',
      },

      headerStyle: {
        backgroundColor: '#DA552F',
        textAlign: 'center',
      },

      headerTintColor: '#fff',
    },
    headerLayoutPreset: 'center',
  },
);

export default createAppContainer(mainNavigation);
