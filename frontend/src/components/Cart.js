import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Ct from './Cs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Cart = () => {
  let navigate = useNavigate()
  let obj = useContext(Ct)
  let [cart,ucart]=useState([])
  let [total,utotal]= useState(0)
  let [f,setf] = useState(true)

  useEffect(()=>{
    if(obj.state._id===""){
      navigate("/login")
    }
    else{
      axios.get(`http://localhost:5555/getcart/${obj.state._id}`).then((res)=>{
        ucart(res.data)
        obj.upd({"cartlength":res.data.length})
        let s=0
        for(let i=0;i<res.data.length;i++){
          s=s+res.data[i].qty * res.data[i].price
        }
        utotal(s)

    })
    }
  },[f, navigate])

  // let knowmore=(prodobj)=>{
  //   obj.upd({"proddet":prodobj})
  //   navigate("/Km")
  // }

  let knowmore = (prodobj) => {
    let productDetails = { ...prodobj, _id: prodobj.pid };  // Ensure we keep original product ID
    obj.upd({ "proddet": productDetails });
    navigate("/Km");
  };

  let shopnow = ()=>{
    navigate("/")
  }

  let inc = (cid)=>{
    if(cid)
    axios.get(`http://localhost:5555/inc/${cid}`).then((res)=>{
      setf(!f)
    })
  }

  let dec = (cid,qty)=>{
    if(qty>1){
    axios.get(`http://localhost:5555/dec/${cid}`).then((res)=>{
      setf(!f)
    })
    }
    else{
      del(cid)
    }
}

let del = (cid)=>{
  axios.delete(`http://localhost:5555/delcart/${cid}`).then((res)=>{
    setf(!f)
  })
}

let buynow = (buyobjj)=>{
  navigate("/buynow")
}

  return (<>
    <div className='cardcon2'>
      {cart.length === 0 && <div className='cart-empty'>
        <img src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='err' />
        Your cart is empty! Start adding some amazing products.
        <button className='cart-shop' onClick={shopnow}>Shop Now</button></div>}
      {
        cart.map((pobj)=>{
          return ( <div className='card'>
          <Card sx={{ maxWidth: 320, boxShadow: '12px 12px 15px rgba(0, 0, 0, 0.4)'}}>
          <CardMedia onClick={()=>knowmore(pobj)}
            sx={{ height: 250,width: 250,margin:2,border:1, cursor:'pointer','&:hover':{opacity:0.8},marginLeft:"10.5%"}}
            image={`http://localhost:5555/pimgs/${pobj.pimg}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"century Gothic"}}>
              {pobj.name}
            </Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic"}}>
              {pobj.desc}
            </Typography><br></br> */}
            <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic",fontWeight:'bold',fontSize:"20px",color:"black"}}>
              Price : {pobj.price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={()=>del(pobj._id)}>Delete</Button>
            <Button size="small" onClick={()=>buynow(pobj)}>Buy Now</Button>
              <Button onClick={()=>dec(pobj._id,pobj.qty)} size="small" style={{fontSize:"30px"}}>-</Button>
              <p style={{color:"rgba(17, 118, 206, 0.8)"}}>{pobj.qty}</p>
              <Button onClick={()=>inc(pobj._id)} size="small" style={{fontSize:"20px"}}>+</Button>
          </CardActions>
        </Card>
        </div>)
        })
        
    }
    </div>
    {cart.length > 0 &&
      <div className='cart-nav'>
        <div className='cart-total'>
          <i className="fas fa-shopping-bag"></i> Cart Total : {total}
        </div>
        <button className='cart-shop'>Place Order</button>
      </div>}
    </>
  )
}

export default Cart