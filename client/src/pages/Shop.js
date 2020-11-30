import React, { useEffect, useState } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../functions/products';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/Cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
  }, []);

  //Fetch Products based on search query in search box
  const fetchProducts = async (arg) => {
    const { data } = await fetchProductsByFilter(arg);
    setProducts(data);
  };
  //Load all products on shop page
  const loadAllProducts = async () => {
    setLoading(true);
    const { data } = await getProductsByCount(12);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //Fetch Products based on price range

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search Filters</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  {' '}
                  <DollarOutlined /> Price{' '}
                </span>
              }
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range={price}
                  onChange={handleSlider}
                  max='4999'
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}
          {products.length < 1 && (
            <p>We didn't find any products related to your query</p>
          )}
          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
