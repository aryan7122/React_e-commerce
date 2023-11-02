import '../style/CategaryBar.css'
import off from '../assets/img/flipkart/Categary/offers.webp'
import beauty from '../assets/img/flipkart/Categary/beu.webp'
import electronics from '../assets/img/flipkart/Categary/el.webp'
import fashion from '../assets/img/flipkart/Categary/fashion.webp'
import furniture from '../assets/img/flipkart/Categary/fas.webp'
import grocery from '../assets/img/flipkart/Categary/grocery.webp'
import home from '../assets/img/flipkart/Categary/home.webp'
import mobil from '../assets/img/flipkart/Categary/mobile.webp'
import tvand from '../assets/img/flipkart/Categary/tv.webp'
import speakers from '../assets/img/flipkart/Categary/speaker.webp'

const CategaryBar = () => {
  return (
    <div>
          <div className="main_1">
              <div className="list">
                  <div className="Categary">
                      <img src={off} alt="" />
                      <h3>Offers</h3>
                  </div>
                  <div className="Categary">
                      <img src={mobil} alt="" />
                      <h3>Mobiles & Tablets</h3>
                  </div>
                  <div className="Categary">
                      <img src={electronics} alt="" />
                      <h3>Electronics</h3>
                      
                  </div>
                  <div className="Categary">
                      <img src={tvand} alt="" />
                      <h3>TVs & Appliances</h3>
                  </div>
                  <div className="Categary">
                      <img src={fashion} alt="" />
                      <h3>Fashion</h3>
                  </div>
                  <div className="Categary">
                      <img src={beauty} alt="" />
                      <h3>Beauty</h3>
                  </div>
                  <div className="Categary">
                      <img src={speakers} alt="" />
                      <h3>Speaker</h3>
                  </div>
                  <div className="Categary">
                      <img src={furniture} alt="" />
                      <h3>Furniture</h3>
                  </div>
                  <div className="Categary">
                      <img src={home} alt="" />
                      <h3>Home & Kitchen</h3>
                  </div>
                  <div className="Categary">
                      <img src={grocery} alt="" />
                      <h3>Grocery</h3>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default CategaryBar
