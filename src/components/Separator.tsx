import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator: React.FC = () => {
  return <View style={style.container} />;
};

const style = StyleSheet.create({
  container: {
    height: 10,
  },
});

export { Separator };
