import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth';
import { LoadingOutlined } from '@ant-design/icons';

// import Header from './components/nav/Header';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import RegisterComplete from './pages/auth/RegisterComplete';
// import Home from './pages/Home';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import History from './pages/user/History';
// import UserRoute from './components/routes/UserRoute';
// import Password from './pages/user/Password';
// import Whishlist from './pages/user/Whishlist';
// import AdminRoute from './components/routes/AdminRoute';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CategoryCreate from './pages/admin/categories/CategoryCreate';
// import CategoryUpdate from './pages/admin/categories/CategoryUpdate';
// import Subcategories from './pages/admin/subcategories/Subcategories';
// import SubcategoriesUpdate from './pages/admin/subcategories/SubcategoriesUpdate';
// import ProductCreate from './pages/admin/products/ProductCreate';
// import AllProducts from './pages/admin/products/AllProducts';
// import ProductUpdate from './pages/admin/products/ProductUpdate';
// import Product from './pages/Product';
// import CategoryHome from './pages/category/CategoryHome';
// import SubHome from './pages/sub/SubHome';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';
// import SideDrawer from './components/Drawer/SideDrawer';
// import Checkout from './pages/Checkout';
// import CreateCouponPage from './pages/admin/coupon/CreateCouponPage';
// import Payment from './pages/Payment';

const Header = lazy(() => import('./components/nav/Header'));

const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const Home = lazy(() => import('./pages/Home'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const History = lazy(() => import('./pages/user/History'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const Password = lazy(() => import('./pages/user/Password'));
const Whishlist = lazy(() => import('./pages/user/Whishlist'));
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CategoryCreate = lazy(() =>
  import('./pages/admin/categories/CategoryCreate')
);
const CategoryUpdate = lazy(() =>
  import('./pages/admin/categories/CategoryUpdate')
);
const Subcategories = lazy(() =>
  import('./pages/admin/subcategories/Subcategories')
);
const SubcategoriesUpdate = lazy(() =>
  import('./pages/admin/subcategories/SubcategoriesUpdate')
);
const ProductCreate = lazy(() =>
  import('./pages/admin/products/ProductCreate')
);
const AllProducts = lazy(() => import('./pages/admin/products/AllProducts'));
const ProductUpdate = lazy(() =>
  import('./pages/admin/products/ProductUpdate')
);
const Product = lazy(() => import('./pages/Product'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));
const SubHome = lazy(() => import('./pages/sub/SubHome'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const SideDrawer = lazy(() => import('./components/Drawer/SideDrawer'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CreateCouponPage = lazy(() =>
  import('./pages/admin/coupon/CreateCouponPage')
);
const Payment = lazy(() => import('./pages/Payment'));

const Login = lazy(() => import('./pages/auth/Login'));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

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
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          __ Laptops Pro
          <LoadingOutlined />
          Shop__
        </div>
      }
    >
      <Header />
      <SideDrawer />
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
        <Route path='/checkout' exact component={Checkout} />

        <UserRoute path='/user/history' exact component={History} />
        <UserRoute path='/user/password' exact component={Password} />
        <UserRoute path='/user/wishlist' exact component={Whishlist} />
        <UserRoute path='/payment' exact component={Payment} />

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
        <AdminRoute path='/admin/coupon' component={CreateCouponPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
