import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const fetchCategoriesStart = () => {
   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
} 

export const fetchCategoriesSuccess = (categories) => {
   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
} 

export const fetchCategoriesFail = (error) => {
   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);
} 

