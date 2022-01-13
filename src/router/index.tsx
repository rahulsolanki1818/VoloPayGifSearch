import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from '../screens';
import {Screens} from './AppNavigator';

const Stack = createStackNavigator();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {AppNavigator};
