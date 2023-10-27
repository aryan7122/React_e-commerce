import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { setNumber } from '../redux/slices/apiSlice';
import '../style/Use.css';

const Use = () => {
    const dispatch = useDispatch();

    const filteredData = useSelector((state) => state.api.filteredData);
    const isLoading = useSelector((state) => state.api.isLoading);

    // Initialize a state to keep track of bookmarked products and their numbers
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [bookmarknumbers, setBookmarknumbers] = useState({});

    useEffect(() => {
        // Retrieve the bookmarked products from localStorage and update state
        const storedBookmarkedProducts = JSON.parse(localStorage.getItem('bookmarkedProducts')) || [];
        setBookmarkedProducts(storedBookmarkedProducts);

        // Retrieve the bookmark numbers from localStorage and update state
        const storedBookmarknumbers = JSON.parse(localStorage.getItem('bookmarknumbers')) || {};
        setBookmarknumbers(storedBookmarknumbers);
    }, []);

    useEffect(() => {
        // Calculate the total number of bookmarks and dispatch it to the Redux store
        const totalBookmarks = Object.values(bookmarknumbers).reduce((acc, value) => acc + value, 0);
        dispatch(setNumber(totalBookmarks));

        // Update local storage for bookmarks and bookmark numbers
        localStorage.setItem('bookmarkedProducts', JSON.stringify(bookmarkedProducts));
        localStorage.setItem('bookmarknumbers', JSON.stringify(bookmarknumbers));
    }, [bookmarknumbers, bookmarkedProducts, dispatch]);

    const toggleBookmark = (productId) => {
        if (bookmarkedProducts.includes(productId)) {
            // If the product is already bookmarked, remove it and set bookmark number to 0
            setBookmarkedProducts(bookmarkedProducts.filter((id) => id !== productId));
            setBookmarknumbers({ ...bookmarknumbers, [productId]: 0 });
        } else {
            // If the product is not bookmarked, add it and set bookmark number to 1
            setBookmarkedProducts([...bookmarkedProducts, productId]);
            setBookmarknumbers({ ...bookmarknumbers, [productId]: 1 });
        }
    };

    return (
        <div className='products'>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                filteredData.map((product) => (
                    <div key={product.id} className='products_card'>
                        <div className="products_card_box">
                            <img src={product.thumbnail} alt="" />
                            <h2>{product.brand}</h2>
                            <div className='price'>
                                <p>Price: ${product.price}</p>
                                <h2>
                                    {product.rating} <BiSolidStarHalf />
                                </h2>
                            </div>

                            <div className='add'>
                                <div
                                    className='add_remove_items'
                                    onClick={() => toggleBookmark(product.id)}
                                    style={{
                                        color: bookmarkedProducts.includes(product.id) ? 'blue' : 'grey',
                                    }}
                                >
                                    {bookmarkedProducts.includes(product.id) ? <h5>Remove Card</h5> : <h5>Add Card</h5>}
                                </div>

                                <div>
                                    <BsFillBookmarkCheckFill
                                        onClick={() => toggleBookmark(product.id)}
                                        style={{
                                            color: bookmarkedProducts.includes(product.id) ? 'blue' : 'gray',
                                        }}
                                    />
                                </div>
                            </div>
                            <h2>{product.description}</h2>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Use;
