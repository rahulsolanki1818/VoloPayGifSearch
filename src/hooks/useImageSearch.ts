import { useCallback, useMemo, useReducer } from 'react';
import { searchImages } from '../api';

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
  return { ...state, ...action };
};

const useImageSearch = () => {
  const [state, dispatch] = useReducer(imageSearchReducer, imageSearchState);

  const searchImage = useCallback(
    async (query: string) => {
      try {
        let page = 0;
        if (state.query === query) {
          page = state.page + 1;
          dispatch({ isLoading: true, page });
        } else {
          page = 0;
          dispatch({ isLoading: true, query, page });
        }

        const offset = page * limit - 1;

        const response = await searchImages({
          limit,
          q: query,
          lang: 'en',
          offset: offset > -1 ? offset : 0,
        });

        if (response?.status === 200) {
          const { data } = response.data;
          dispatch({ result: page > 0 ? [...state.result, ...data] : data });
        }
      } catch (error) {
        console.log('Something went wrong while searching');
        console.log(error);
      } finally {
        dispatch({ isLoading: false });
      }
    },
    [state],
  );

  const returnedState = useMemo(() => {
    return {
      state,
      searchImage,
    };
  }, [state, searchImage]);

  return returnedState;
};

export { useImageSearch };
