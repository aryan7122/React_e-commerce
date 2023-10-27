import { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setNumber } from '../redux/slices/apiSlice';
import '../style/Use.css'
const Use = () => {
    const dispatch = useDispatch();

    const filteredData = useSelector((state) => state.api.filteredData); // Get filteredData from Redux
    const isLoading = useSelector((state) => state.api.isLoading);

    // Initialize a state to keep track of bookmarked products and their numbers
    const [bookmarkedProducts2, setBookmarkedProducts2] = useState([{}]);
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [bookmarknumbers, setBookmarknumbers] = useState({});
    // const [bookmarknumbers, setBookmarknumbers] = useState({});


    // console.log('bookmarknumbers', bookmarknumbers)

    const valuesArray = Object.values(bookmarknumbers);
    const Totals = valuesArray.reduce((acc, value) => acc + value, 0);
    console.log('totale:', Totals)
    dispatch(setNumber(Totals));

    // localStorage.setItem(productId, Totals)

    useEffect(() => {
        // Retrieve the bookmarked products from localStorage and update state
        const storedBookmarkedProducts = localStorage.getItem('setBookmarkedProducts2');
        if (storedBookmarkedProducts) {
            setBookmarkedProducts(JSON.parse(storedBookmarkedProducts));
            // console.log('storedBookmarkedProducts:', storedBookmarkedProducts)
        }

        // Retrieve the bookmarknumbers from localStorage and update state
        const storedBookmarknumbers = localStorage.getItem('bookmarknumbers');
        if (storedBookmarknumbers) {
            setBookmarknumbers(JSON.parse(storedBookmarknumbers));
            console.log('storedBookmarknumbers', storedBookmarknumbers)
        }
    }, []);


    const toggleBookmark = (productId) => {
        if (bookmarkedProducts.includes(productId)) {
            // If the product is already bookmarked, remove it and set bookmarknumber to 0
            setBookmarkedProducts(bookmarkedProducts.filter((id) => id !== productId));
            setBookmarknumbers({ ...bookmarknumbers, [productId]: 0 });
        } else {
            // If the product is not bookmarked, add it and set bookmarknumber to 1
            setBookmarkedProducts([...bookmarkedProducts, productId]);
            setBookmarknumbers({ ...bookmarknumbers, [productId]: 1 });

            localStorage.setItem('bookmarkedProducts', JSON.stringify(bookmarkedProducts));
        }
    };
    const toggleBookmark2 = (productId) => {
        // console.log('setBookmarkedProducts2', productId)
        if (bookmarkedProducts2.includes(productId)) {
            // If the product is already bookmarked, remove it and set bookmarknumber to 0
            setBookmarkedProducts2(bookmarkedProducts2.filter((id) => id !== productId));
        } else {
            // If the product is not bookmarked, add it and set bookmarknumber to 1
            setBookmarkedProducts2([...bookmarkedProducts2, productId]);
        }
        localStorage.setItem('bookmarkedProducts2', (productId));

    };

    // setTotal(totalBookmarks)



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
                                    {/* <BsFillBookmarkCheckFill/> */}
                                    {/* add Card */}
                                    {bookmarkedProducts.includes(product.id) ? <h5> remove card</h5> : <h5>add card</h5>}
                                    {/* {bookmarknumbers[product.id] || 0} */}
                                </div>

                                <div>
                                    <BsFillBookmarkCheckFill
                                        onClick={() => toggleBookmark2(product)}
                                        style={{
                                            color: bookmarkedProducts2.includes(product.id) ? 'blue' : 'gray',
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
