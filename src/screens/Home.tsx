import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImageCard, SearchBox, Separator } from '../components';
import { useTagSearch } from '../hooks';
import { useImageSearch } from '../hooks/useImageSearch';
import { Size } from '../theme';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [searchValue, setSearchValue] = useState('funny');
  const [hideSuggestionList, setHideSuggestionList] = useState(false);

  const { state, searchTag } = useTagSearch();
  const { state: imageSearchState, searchImage } = useImageSearch();

  const imageListRef = useRef<FlatList>(null);

  useEffect(() => {
    onSearchImage();
  }, []);

  const onSearchImage = useCallback(() => {
    searchImage(searchValue);
  }, [searchValue, searchImage]);

  const onTagSelect = useCallback(
    (tag: string) => {
      setSearchValue(tag);
      searchTag(tag);
      setHideSuggestionList(true);

      searchImage(tag);
      imageListRef.current?.scrollToIndex({ animated: true, index: 0 });
      Keyboard.dismiss();
    },
    [searchImage, searchTag],
  );

  const onValueChange = useCallback(
    (value: string) => {
      if (hideSuggestionList) {
        setHideSuggestionList(false);
      }
      setSearchValue(value);
      searchTag(value);
    },
    [hideSuggestionList, searchTag],
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        value={searchValue}
        suggestionLoading={state.isLoading}
        suggestionsList={state.result}
        hideSuggestionList={hideSuggestionList}
        onTagSelect={onTagSelect}
        onValueChange={onValueChange}
      />

      <FlatList<ImageSearch>
        ref={imageListRef}
        data={imageSearchState.result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ImageCard}
        initialNumToRender={1}
        maxToRenderPerBatch={5}
        onEndReachedThreshold={0.5}
        onEndReached={onSearchImage}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <ActivityIndicator size="large" animating={imageSearchState.isLoading} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Size[10],
    paddingTop: Size[10],
  },
});

export { Home };
