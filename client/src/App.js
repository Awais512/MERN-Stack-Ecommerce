import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import Password from './pages/user/Password';
import Whishlist from './pages/user/Whishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/categories/CategoryCreate';
import CategoryUpdate from './pages/admin/categories/CategoryUpdate';
import Subcategories from './pages/admin/subcategories/Subcategories';
import SubcategoriesUpdate from './pages/admin/subcategories/SubcategoriesUpdate';
import ProductCreate from './pages/admin/products/ProductCreate';
import AllProducts from './pages/admin/products/AllProducts';
import ProductUpdate from './pages/admin/products/ProductUpdate';
import Product from './pages/Product';
import CategoryHome from './pages/category/CategoryHome';
import SubHome from './pages/sub/SubHome';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/register/complete' exact component={RegisterComplete} />
        <Route path='/forgot/password' exact component={ForgotPassword} />
        <Route path='/product/:slug' exact component={Product} />
        <Route path='/category/:slug' exact component={CategoryHome} />
        <Route path='/sub/:slug' exact component={SubHome} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/cart' exact component={Cart} />

        <UserRoute path='/user/history' exact component={History} />
        <UserRoute path='/user/password' exact component={Password} />
        <UserRoute path='/user/whishlist' exact component={Whishlist} />

        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/admin/category' exact component={CategoryCreate} />
        <AdminRoute
          path='/admin/category/:slug'
          exact
          component={CategoryUpdate}
        />
        <AdminRoute path='/admin/sub' exact component={Subcategories} />
        <AdminRoute
          path='/admin/sub/:slug'
          exact
          component={SubcategoriesUpdate}
        />
        <AdminRoute path='/admin/product' exact component={ProductCreate} />
        <AdminRoute path='/admin/products' exact component={AllProducts} />
        <AdminRoute path='/admin/product/:slug' component={ProductUpdate} />
      </Switch>
    </>
  );
};

export default App;
