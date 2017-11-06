/* eslint no-case-declarations: 0 */
import mapKeys from 'lodash/mapKeys';
import { RECEIVE_CATEGORY_LIST } from './categoryActions';

function postReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORY_LIST:
      const newCategories = mapKeys(action.categories, 'name');
      return {
        ...state,
        ...newCategories
      };
    default:
      return state;
  }
}

export default postReducer;
