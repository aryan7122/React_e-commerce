import { useSelector, useDispatch } from 'react-redux';
import products from '../components/product.json'
import { useState } from 'react';
import { useEffect } from 'react';

import '../style/ProductPage.css'

const ProductPage = () => {
  const dispatch = useDispatch();

  // const [val, setVal] = useState(-1)
  const [pageDetails, setPageDetails] = useState({})
  const value = useSelector((state) => state.api.productPageRedux);
  // setVal(value)
  // console.log('val', val)
  const productsObject = { products };
  console.log('productsObject', productsObject)
  // console.log('productsObject', productsObject.products.products[value - 1])
  const data = productsObject.products.products[value - 1];
  // console.log('data', data)
  useEffect(() => {
    setPageDetails(data)
  }, [data, dispatch]);

  return (

    <div className='pageDetails_main'>
      {/* {pageDetails.id == val} */}
      {pageDetails == null ? '' :
        <div>
          <div className='card_details'>
            <div>
              <img src={pageDetails.thumbnail} alt="" />
            </div>
            <div>
              <h1>{pageDetails.brand}</h1>
              <h2>model {pageDetails.title}</h2>
              <h2>{pageDetails.category}</h2>
              <h2>rating {pageDetails.rating}</h2>
              <div className='price_'>
                <h2> Price: ${pageDetails.price} </h2>
                <h3> off: ${pageDetails.discountPercentage}</h3>
              </div>
              <h2>stock {pageDetails.stock}</h2>
              <h2>stock {pageDetails.description}</h2>
            </div>

          </div>
          <div>
                <button>buy</button>
          </div>
        </div>
      }
    </div >
  )
}

export default ProductPage
