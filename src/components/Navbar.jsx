import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredData } from '../redux/slices/apiSlice';
import { setAddCardShow } from '../redux/slices/apiSlice';


import '../style/navbar.css'
import { BiSolidCartAdd } from 'react-icons/bi'
import { BsFillBookmarkPlusFill, BsFillFilterCircleFill, BsSearch } from 'react-icons/bs'
import AddCard from '../pages/AddCard';
import products from './product.json'
import Bookmark from '../pages/Bookmark';

import Logo from '../assets/img/flipkart/flipkart.svg'

const Navbar = () => {

    const [isNavFixed, setNavFixed] = useState(false);


    const dispatch = useDispatch();

    const [isFilter, setIsFilter] = useState(false);
    const [isToggledbm, setIsToggledbm] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const bookMakShow = useSelector((state) => state.api.bookMakShow);
    const number = useSelector((state) => state.api.number)
    const apiData = useSelector((state) => state.api.apiData);
    // const AddCardShow = useSelector((state) => state.api.addCardShow);
    // const toggleBlock = useSelector((state) => state.api.toggleBlock);
    // console.log("☢️ ☢️", AddCardShow.map(it => it.id));
    // console.log('bookMakShow', bookMakShow.length)
    // map(e => e.length)



    useEffect(() => {
        const card_num = JSON.parse(localStorage.getItem('addCard_local')) || [];
        setAdd(card_num);
        // console.log('card_num☢️',    card_num)
    }, []);


    useEffect(() => {
        const filteredData = apiData.filter((product) => {
            const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase());
            const matchesPrice = priceFilter === 'all' || product.price <= parseInt(priceFilter);
            const matchesRating = ratingFilter === 'all' || product.rating <= parseFloat(ratingFilter);
            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            return matchesSearch && matchesPrice && matchesRating && matchesCategory;
        });

        // Set the filteredData in Redux store
        dispatch(setFilteredData(filteredData));

    }, [searchText, priceFilter, ratingFilter, categoryFilter, apiData, dispatch]);

    //[[[[[[[[[[[[[[1]]]]]]]]]]]]]]


    const [add, setAdd] = useState([]);
    const productsObject = { products };

    const arr = []
    useEffect(() => {
        add.forEach(fun);
        function fun(value) {
            const product = productsObject.products.products[value - 1];
            arr.push(product)
            // console.log('product', product)
        }
        // console.log('arr', arr)
        dispatch(setAddCardShow(arr));
    }, [add, dispatch]);

    const filterToggle = () => {
        if (isFilter) {
            setIsFilter(false);
        } else {
            setIsFilter(true);
            // alert('', isToggled)
        }
    };

    const toggleCartAdd = () => {
        if (isToggled) {
            setIsToggled(false);
        } else {
            // alert('', isToggled)
            setIsToggled(true);

        }
    };

    const toggleBookmark = () => {
        if (isToggledbm) {
            setIsToggledbm(false);
        } else {
            // alert('', isToggled)
            setIsToggledbm(true);

        }
    };
    const handleScroll = () => {
        if (window.scrollY >= 100) {
            setNavFixed(true);
        } else {
            setNavFixed(false);
        }
    };

    // scroll to fixed navbar
    // Add an event listener to track the scroll position
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className={`header filters  ${isNavFixed ? 'fixed' : ''}`}>
                <div className='logo_name'>
                    {/* <h1>Flipkart</h1> */}
                    <img src={Logo} alt="" />
                </div>
                <div className="input">
                    <BsSearch />
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div
                    className={`selects  ${isFilter ? 'toggle_filter' : ''}`}
                        >
                    <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                        <option value="all">All Prices</option>
                        <option value="50">Price less than $50</option>
                        <option value="100">Price less than $100</option>
                        <option value="200">Price less than $200</option>
                        <option value="500">Price less than $500</option>
                        <option value="1000">Price less than $1000</option>
                        <option value="10000">Price less than $1000</option>
                    </select>
                    <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                        <option value="all">All Ratings</option>
                        <option value="5">Rating 5 and less</option>
                        <option value="4.5">Rating 4.5 and less</option>
                        <option value="4">Rating 4 and less</option>
                        <option value="3">Rating 3 and less</option>
                        <option value="2">Rating 2 and less</option>
                    </select>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                        <option value="fragrances">fragrances</option>
                        <option value="skincare">skincare</option>
                        <option value="groceries">groceries</option>
                        <option value="home-decoration">home-decoration</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            <div
                    // className='filter'
                    className={`filter  ${isFilter ? 'toggle_filter_color' : ''}`}
                onClick={filterToggle}
            >
                <BsFillFilterCircleFill />
            </div>

            <div className='icons'
                onClick={toggleBookmark}
                className={`some_classes_book ${isToggledbm ? 'toggle_color_bookMark' : ''}`}
            >
                <BsFillBookmarkPlusFill />
                    <span className={`dot_bookmark ${bookMakShow.length > 0  ? 'dot_bookmark_block' : ''}`}
                ></span>
            </div>
            <div
                onClick={toggleCartAdd}
                className={`some_classes ${isToggled ? 'toggle_color' : ''}`}
            >
                <BiSolidCartAdd />
                <span className='number'>
                    {number}
                </span>
            </div>

            <div className="User_details">
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" />
            </div>

        </div>
            <div
                className={`D_none ${isToggled ? 'toggle_block' : ''}`}
            >
                <AddCard />
            </div>
            <div
                className={`book_mark_none ${isToggledbm ? 'toggle_block_bookMark' : ''}`}
            >
                <Bookmark />
            </div>
        </div>

    );
}

export default Navbar;
