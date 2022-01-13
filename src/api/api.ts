import Config from 'react-native-config';
import * as Utils from './utils';

const api = Utils.createAxiosInstance(Config.BASE_URL);
api.interceptors.request.use(Utils.globalUserTokenInterceptor);

export const searchTags = (params: SearchTagsParam) => {
  return api.get<SearchTagsResponse>(
    `/${Utils.gifApiVersion()}/gifs/search/tags`,
    {params},
  );
};

export const searchImages = (params: SearchImagesParam) => {
  return api.get(`/${Utils.gifApiVersion()}/gifs/search`, {params});
};
