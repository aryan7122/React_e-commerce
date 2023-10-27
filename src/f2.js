import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BiSolidStarHalf } from 'react-icons/bi';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import '../style/Use.css';

const Use = () => {
    // const dispatch = useDispatch();
    const filteredData = useSelector((state) => state.api.filteredData);
    const isLoading = useSelector((state) => state.api.isLoading);

    const [bookmark, setBookmark] = useState([]);
    const [addCard, setAddCard] = useState([]);
    console.log('bookmark', bookmark)
    console.log('addCard', addCard)

    useEffect(() => {
        // Load stored data from localStorage when the component mounts
        const bookmark_local = JSON.parse(localStorage.getItem('bookmark_local'));
        const addCard_local = JSON.parse(localStorage.getItem('addCard_local'));

        if (bookmark_local) {
            setBookmark(bookmark_local);
        }

        if (addCard_local) {
            setAddCard(addCard_local);
        }
    }, []);



    const toggleAdd = (product) => {
        if (addCard.includes(product)) {
            setAddCard(addCard.filter((item) => item !== product));
        } else {
            setAddCard([...addCard, product]);
        }
        localStorage.setItem('addCard_local', JSON.stringify(addCard));
    };

    const toggleBookmark = (product) => {
        if (bookmark.includes(product)) {
            setBookmark(bookmark.filter((item) => item !== product));
        } else {
            setBookmark([...bookmark, product]);
        }
        localStorage.setItem('bookmark_local', JSON.stringify(bookmark));
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
                                    onClick={() => toggleAdd(product)}
                                    style={{
                                        color: addCard.includes(product) ? 'gray' : 'blue',
                                    }}>
                                    {addCard.includes(product) ? <h5>remove</h5> : <h5>add</h5>}
                                </div>

                                <div>
                                    <BsFillBookmarkCheckFill
                                        onClick={() => toggleBookmark(product)}
                                        style={{
                                            color: bookmark.includes(product) ? 'gray' : 'blue',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Use;
