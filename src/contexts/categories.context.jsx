import { useEffect } from 'react';
import { useState, createContext } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
})
export const CategoriesProvider = ({children}) => {
    const [ categoriesMap, setcategoriesMap ] = useState([]);

    // fetch data from firestore - since it is a db call whoch we use in useEffect,
    // we are creating a async function with which to make the call upon provider mount
    useEffect( () => {
        const fetchCategories = async() => {
          const result =  await getCategoriesAndDocuments();
          setcategoriesMap(result);
          console.log(result);
        }

        fetchCategories();
    }, []);
    // useEffect(() => {
    //     addCollectionsAndDocuments('categories', SHOP_DATA);
    // }, []);
    const value = { categoriesMap };
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};

