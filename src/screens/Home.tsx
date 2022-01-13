import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Heee asdfdasfad dafadfad </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {Home};
