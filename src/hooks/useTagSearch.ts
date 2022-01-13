import {useCallback, useMemo, useState} from 'react';
import {searchTags} from '../api';

const useTagSearch = () => {
  const [isLoading, setLoading] = useState(false);
  const [result, setResults] = useState<Array<Tag>>([]);

  const searchTag = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const response = await searchTags({q: query});
      if (response?.status === 200) {
        setResults(response.data.data);
      }
    } catch (error) {
      console.log('Something went wrong while searching');
    } finally {
      setLoading(false);
    }
  }, []);

  const returnState = useMemo(() => {
    return {
      state: {
        isLoading,
        result,
      },
      searchTag,
    };
  }, [isLoading, result, searchTag]);

  return returnState;
};

export {useTagSearch};
