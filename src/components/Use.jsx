import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BsFillBookmarkCheckFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import '../style/Use.css';
import { setNumber, setProductPageRedux } from '../redux/slices/apiSlice';
import ProductPage from '../pages/ProductPage';
import { FaBackspace } from 'react-icons/fa'

const Use = () => {
    const dispatch = useDispatch();
    const filteredData = useSelector((state) => state.api.filteredData);
    const isLoading = useSelector((state) => state.api.isLoading);

    const [productPage, setProductPage] = useState(0);
    const [bookmark, setBookmark] = useState([]);
    const [addCard, setAddCard] = useState([]);

    console.log('productPage', productPage)
    dispatch(setNumber(addCard.length));
    dispatch(setProductPageRedux(productPage));




    useEffect(() => {
        const bookmark_local = JSON.parse(localStorage.getItem('bookmark_local')) || [];
        setBookmark(bookmark_local);

        const addCard_local = JSON.parse(localStorage.getItem('addCard_local')) || [];
        setAddCard(addCard_local);


        // console.log('addCard_local', addCard_local)
    }, []);

    useEffect(() => {
        localStorage.setItem('addCard_local', JSON.stringify(addCard));
        localStorage.setItem('bookmark_local', JSON.stringify(bookmark));
        const Add = addCard.map(product => product.id);
        localStorage.setItem('add_num', JSON.stringify(Add));
    }, [bookmark, addCard]);



    const toggleAdd = (product) => {
        if (addCard.includes(product)) {
            setAddCard(addCard.filter((item) => item !== product));
        } else {
            setAddCard([...addCard, product]);
        }

    };

    const toggleBookmark = (product) => {
        if (bookmark.includes(product)) {
            setBookmark(bookmark.filter((item) => item !== product));
        } else {
            setBookmark([...bookmark, product]);
        }
    };
    const productPages = (product) => {
        setProductPage(product);

    };

    const handleGoBack = () => {
        setProductPage(0)
    };
    return (
        <>
            {productPage >= 1 ?
                <div>
                    <button
                        className='back_button_home'
                        onClick={handleGoBack} ><FaBackspace /></button>
                <ProductPage />
                </div>
                :
                <div className='products'>
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        filteredData.map((product) => (
                            <div
                                key={product.id} className='products_card'>

                                <div
                                    className="products_card_box">
                                    <div
                                        onClick={() => productPages(product.id)}
                                    >

                                        <img
                                            src={product.thumbnail} alt="" />
                                        <h2>{product.brand}</h2>
                                        <h2 className='description'>{product.description}</h2>
                                        <div className='price'>
                                            <p>Price: ${product.price}</p>
                                            <h2>
                                                {product.rating} <BiSolidStarHalf />
                                            </h2>
                                        </div>
                                    </div>
                                    <div className='add'>
                                        <div
                                            className='add_remove_items'
                                            onClick={() => toggleAdd(product.id)}
                                            style={{
                                                color: addCard.includes(product.id) ? 'gray' : 'blue',
                                            }}>
                                            {addCard.includes(product.id) ? <h5>remove Card</h5> : <h5>add Card</h5>}
                                        </div>

                                        <div
                                            onClick={() => toggleBookmark(product.id)}
                                            style={{
                                                color: bookmark.includes(product.id) ? 'gray' : 'blue',
                                            }}
                                        >
                                            {bookmark.includes(product.id) ? <BsFillBookmarkCheckFill /> : <BsFillBookmarkPlusFill />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>}
        </>

    );
};

export default Use;
