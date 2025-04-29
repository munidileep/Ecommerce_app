import React, { useContext, useEffect, useState } from 'react'
import Ct from './Cs'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function Km() {
  let obj = useContext(Ct)
  let navigate = useNavigate()

  let [pobj, uprod] = useState(() => {
    return JSON.parse(sessionStorage.getItem("proddet")) || {};
  });

  useEffect(() => {
    if (obj.state.proddet) {
      uprod(obj.state.proddet);
      sessionStorage.setItem("proddet", JSON.stringify(obj.state.proddet)); // Save in sessionStorage
    }
  }, [obj.state]);

  let addcart = (prodobj) => {
    if (obj.state.token !== "") {
      axios.post("http://localhost:5555/addcart", { "uid": obj.state._id, "pid": prodobj._id, "pimg": prodobj.pimg, "price": prodobj.price, "name": prodobj.name, "qty": 1, "desc": prodobj.desc, "cat": prodobj.cat }).then(() => {
        navigate("/cart")
      })
    }
    else {
      localStorage.setItem("pendingCartItem", JSON.stringify(prodobj));
      navigate("/login")
    }
  }

  let buynow = (buyobj) => {
    if (obj.state.token !== "") {
      navigate("/buynow")
    }
    else {
      navigate("/login")
    }
  }
  return (
    <div className='km'>
      <div className='kimg'>
        <img src={`http://localhost:5555/pimgs/${pobj.pimg}`} alt='error' />
      </div>
      <div className='kdet'>
        <div className='details'>
          <p className='prodkey'>Name : </p>
          <h2 >{pobj.name}</h2>
        </div>
        <div className='details'>
          <p className='prodkey'>Price : </p>
          <h2>₹ {pobj.price}</h2>
        </div>
        <div className='details'>
          <p className='prodkey'>Category : </p>
          <h2>{pobj.cat}</h2>
        </div>
        <div className='details'>
          <p className='prodkey'>Description : </p>
          <span>{pobj.desc}</span>
        </div>
        <div className="offers">
          <h3>Available Offers</h3>
          <p><i className="fa-solid fa-tag"></i><strong>Special Price</strong> - Get extra 44% off (price inclusive of cashback/coupon) </p><span>T&C</span>
          <p><i className="fa-solid fa-tag"></i><strong>Bank Offer</strong> - 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</p><span>T&C</span>
          <p><i className="fa-solid fa-tag"></i><strong>Bank Offer</strong> - Flat ₹500 off on Credit Card EMI Transactions, on order of ₹15,000 & above</p><span>T&C</span>
          {/* <p><i class="fa-solid fa-tag"></i><strong>Bank Offer</strong> - 10% off up to ₹1,200 on HDFC Bank Credit Card EMI on 6 and 9 months tenure. Min Txn Value: ₹5000 </p><span>T&C</span> */}
        </div>
        <div className='mainbtndiv'>
          <button className='btndiv' onClick={() => addcart(pobj)}>Add Cart</button>
          <button className='btndiv' onClick={() => buynow(pobj)}>Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default Km