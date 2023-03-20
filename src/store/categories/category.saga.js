import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFail, fetchCategoriesSuccess } from "./categories.action ";
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { CATEGORIES_ACTION_TYPES } from "./categories.types";


// here we use sagas to connect with redux
// we dispatch action methods such that sagas trigger w.r.t to those dispatched actions


 export function* fetchCategoriesAsync(){
    try {
        const categoryMap = yield call(getCategoriesAndDocuments, 'categories' );
        yield put(fetchCategoriesSuccess(categoryMap));
     } catch ( error ) {
        yield put(fetchCategoriesFail(error));
     }
 }


export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync )
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)]);
}