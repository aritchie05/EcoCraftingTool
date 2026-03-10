import {ServerItemsResponse} from './server-item';
import {ServerRecipesResponse} from './server-recipe';

export interface ServerDataResponse {
  itemsResponse: ServerItemsResponse;
  recipesResponse: ServerRecipesResponse;
}
