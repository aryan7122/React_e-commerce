import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import '../style/bookmark.css'
import products from '../components/product.json'
import { setBookMakShow } from '../redux/slices/apiSlice';

const Bookmark = () => {
    const dispatch = useDispatch();
    const [bookmark, setBookmark] = useState([]);
    const bookMakShow = useSelector((state) => state.api.bookMakShow);
    const isLoading = useSelector((state) => state.api.isLoading);

    // console.log("bookmark_", bookmark)

    useEffect(() => {
        const bookmark_local = JSON.parse(localStorage.getItem('bookmark_local')) || [];
        setBookmark(bookmark_local);
    }, []);

    const productsObject = { products };
    // console.log(productsObject)

    const arr = []
    useEffect(() => {
        bookmark.forEach(fun);
        function fun(value) {
            const product = productsObject.products.products[value - 1];
            arr.push(product)
            // console.log('product', product)
        }
        // console.log('arr', arr)
        dispatch(setBookMakShow(arr));
    }, [bookmark, dispatch]);

    return (
        <div className="book_mark">
            BookMark
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                bookMakShow.map((product) => (
                    <div key={product.id} className='products_card'>
                        <img src={product.thumbnail} alt="" />
                        <div className="title">
                            {/* <h2>{product.id}</h2> */}
                            <h2>{product.brand}</h2>
                            <h2>Price: ${product.price}</h2>
                        </div>
                        <hr />
                    </div>
                ))
            )}
        </div>
    )
}

export default Bookmark
