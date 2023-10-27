import '../style/addcard.css'
import { useState } from 'react';
// import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddCard = () => {
  const [count, setCount] = useState(0);
  const [priceAdded, setPriceAdded] = useState([]);
  console.log('priceAdded', priceAdded)
  
  // const arr = []
  console.log('count', count)
  // setCount(arr)
  // arr.push([])


  const AddCardShow = useSelector((state) => state.api.addCardShow);
  const isLoading = useSelector((state) => state.api.isLoading);

  // console.log('pop', AddCardShow.map(it =>it.name ))

  const increment = (product) => {
    console.log('product', product)
    if (priceAdded.includes(product)) {
      setPriceAdded(priceAdded.filter((item) => item !== product));
      if (product) {
        setCount(count + 1);
      }
    } else {
      setPriceAdded([...priceAdded, product]);
      console.log('object', [priceAdded])
    }
    // setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <div className="card_add">
      add card
      {/* {card} */}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        AddCardShow.map((product) => (
          <div key={product.id} className='products_card'>
            <img src={product.thumbnail} alt="" />
            <div className="title">
              <h2>{product.brand}</h2>
              <h2>Price: ${product.price}</h2>
            </div>

            <div className='price_add'>
              <div className='count'>
                <button onClick={decrement}>-</button>
                <div>{priceAdded.includes(product.id) ? count : '' }</div>
                <button onClick={() => increment(product.id)}>+</button>
              </div>
              <div>
                Toale: ${priceAdded.includes(product.id) ? count * product.price : ''} 
              </div>
            </div>
            <hr />
          </div>
        ))
      )}

    </div>
  )
}

export default AddCard
