import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SearchBox} from '../components';
import {useTagSearch} from '../hooks';
import {useImageSearch} from '../hooks/useImageSearch';
import {Size} from '../theme';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const {state, searchTag} = useTagSearch();
  const {state: imageSearchState, searchImage} = useImageSearch();
  const [searchValue, setSearchValue] = useState('funny');
  const [hideSuggestionList, setHideSuggestionList] = useState(false);

  useEffect(() => {
    console.log(imageSearchState);
    console.log(imageSearchState);
  }, [imageSearchState]);

  const onTagSelect = useCallback(
    (tag: string) => {
      setSearchValue(tag);
      searchTag(tag);
      setHideSuggestionList(true);

      searchImage(tag);

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

export {Home};
