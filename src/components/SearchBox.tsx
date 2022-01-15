import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ListRenderItem,
  Text,
  ActivityIndicator,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Size } from '../theme';

interface SearchBoxProps {
  value?: string;
  suggestionsList?: Array<Tag>;
  style?: StyleProp<ViewStyle>;
  hideSuggestionList: boolean;
  suggestionLoading?: boolean;
  onTagSelect: (tag: string) => void;
  onValueChange?: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = props => {
  const TagRow: ListRenderItem<Tag> = ({ item }) => (
    <TouchableOpacity style={styles.tagItem} onPress={() => props.onTagSelect(item.name)}>
      <Text style={styles.tagText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <View style={[styles.container, props.style]}>
        <Icon name="search-outline" size={30} color={Colors.icon} />
        <TextInput
          style={styles.textInput}
          value={props.value}
          onChangeText={props.onValueChange}
        />
      </View>
      {props.suggestionLoading ? (
        <ActivityIndicator size="large" />
      ) : !props.hideSuggestionList ? (
        <FlatList<Tag>
          style={styles.list}
          refreshing={props.suggestionLoading}
          data={props.suggestionsList}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          keyExtractor={(i, index) => index.toString()}
          renderItem={TagRow}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    zIndex: 1,
  },
  container: {
    borderRadius: Size[20],
    borderWidth: Size[1],
    borderColor: Colors.background.transparent,
    height: Size[50],
    backgroundColor: Colors.background.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Size[2],
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Size[5],
    paddingLeft: Size[20],
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size[10],
  },
  textInput: {
    flex: 1,
    paddingLeft: Size[10],
  },
  list: {
    position: 'absolute',
    top: Size[50],
    left: 0,
    right: 0,
    zIndex: 5,
    backgroundColor: Colors.background.white,
    borderRadius: Size[20],
  },
  tagItem: {
    height: Size[35],
    backgroundColor: Colors.background.white,
    borderColor: Colors.border.gray,
    margin: Size[1],
    borderRadius: Size[20],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Size[2],
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Size[5],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { SearchBox };
