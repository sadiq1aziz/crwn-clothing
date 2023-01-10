import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import CheckOut from './routes/checkout/checkout.component';
import { createUserDocumentFromAuth, getCategoriesAndDocuments, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action'; 
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from './store/categories/categories.action ';
const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

useEffect(() => {
  console.log("useefffect");
  const fetchCategories = async () => {
    const categoryMap = await getCategoriesAndDocuments('categories');
    console.log(categoryMap);
    dispatch(setCategories(categoryMap));
    
  }

  fetchCategories();
}, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<CheckOut />} />
      </Route>
    </Routes>)
}

export default App;
