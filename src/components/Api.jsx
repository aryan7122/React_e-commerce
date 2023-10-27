import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setApiData } from '../redux/slices/apiSlice';
import products from './product.json'

const Api = () => {

    const dispatch = useDispatch();
    // console.log('product', products.products)
    useEffect(() => {
        // const url = 'https://dummyjson.com/products';
        async function fetchData() {
            try {
                // const response = await fetch(url);
                // const data = await response.json();
                // dispatch(setApiData(data.products));
                dispatch(setApiData(products.products));
                // console.log(data.products)
            } catch (error) {
                console.error('Error fetching data ❌:', error);
            }
        }
        fetchData();
    }, [dispatch]);

    return (
        <>
        </>
    );
}

export default Api;
