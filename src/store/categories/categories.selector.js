import { createSelector } from "reselect";
// Peels off categories reducer form the state object from redux
const selectCategoriesReducer = (state) => {
    return state.categories;
};
// Memoizes the categories reducer that we pass into the createSelector method
// runs only if data has updated and peels off the categories array
export const selectCategoriesArray = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => {
        return categoriesSlice.categoriesArray;
    }
);
// Memoizes the categories aray that we pass into the createSelector method
// runs only if data has updated and returns the reduced accumulator map object with the categories array
export const selectCategoriesMap = createSelector(
    [selectCategoriesArray],
    (categoriesArray) => {
        return categoriesArray.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
)
