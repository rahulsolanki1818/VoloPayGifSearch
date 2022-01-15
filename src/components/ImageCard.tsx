import React from 'react';
import { StyleSheet, ListRenderItem, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Colors, Size } from '../theme';

type ImageCardProps = ListRenderItem<ImageSearch>;

const ImageCard: ImageCardProps = ({ item }) => {
  const { url, width, height } = item.images.fixed_height_small;
  const imgHeight = parseInt(height, 10);
  const imgWidth = parseInt(width, 10);
  const aspectRatio = imgWidth / imgHeight;

  return (
    <View style={[styles.container, { aspectRatio }]}>
      <FastImage source={{ uri: url }} style={[styles.image]} />
      <View style={styles.floatingTitle}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size[10],
    borderRadius: Size[20],
    backgroundColor: Colors.background.white,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: Size[10],
    borderRadius: Size[20],
  },
  floatingTitle: {
    position: 'absolute',
    left: Size[10],
    right: Size[10],
    bottom: Size[10],
    backgroundColor: `${Colors.background.white}a5`,
    height: Size[25],
  },
  title: {
    fontSize: Size[16],
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { ImageCard };
