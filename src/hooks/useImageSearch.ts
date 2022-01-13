import {useCallback, useMemo, useReducer} from 'react';
import {searchImages} from '../api';

interface ImageSearchState {
  isLoading: boolean;
  result: Array<ImageSearch>;
  page: number;
  query: string;
}

const imageSearchState: ImageSearchState = {
  isLoading: false,
  result: [],
  page: 0,
  query: '',
};

const limit = 10;

const imageSearchReducer = (
  state: ImageSearchState,
  action: Partial<Record<keyof ImageSearchState, any>>,
) => {
  return {...state, ...action};
};

const useImageSearch = () => {
  const [state, dispatch] = useReducer(imageSearchReducer, imageSearchState);

  const searchImage = useCallback(
    async (q: string) => {
      try {
        if (state.query === q) {
          dispatch({isLoading: true, page: state.page + 1});
        } else {
          dispatch({isLoading: true, query: q, page: 0});
        }

        const response = await searchImages({
          q,
          lang: 'en',
          limit,
          offset: state.page * limit,
        });
        if (response?.status === 200) {
          dispatch({result: response.data.data});
        }
      } catch (error) {
        console.log('Something went wrong while searching');
        console.log(error);
      } finally {
        dispatch({isLoading: false});
      }
    },
    [state.page, state.query],
  );

  const returnedState = useMemo(() => {
    return {
      state,
      searchImage,
    };
  }, [state, searchImage]);

  return returnedState;
};

export {useImageSearch};
