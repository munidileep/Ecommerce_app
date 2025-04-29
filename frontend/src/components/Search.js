import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Cs';
import { useNavigate } from "react-router-dom"


const Search = () => {
    let obj = useContext(Ct)
    let[prod,uprod]=useState([])
    let navigate=useNavigate()

    useEffect(()=>{
        fetchprod();
    },[obj.state.searchd])
    
    let fetchprod = ()=>{
        axios.get(`http://localhost:5555/search?sid=${obj.state.searchd}`).then((res)=>{
            if (Array.isArray(res.data)) {
                uprod(res.data); // ✅ Set products if response is an array
            } else {
                uprod([]); // ✅ Set an empty array to prevent errors
            }
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            uprod([]); // ✅ Prevent errors by ensuring an array
        });
    }

    let knowmore=(prodobj)=>{
        obj.upd({"proddet":prodobj})
        sessionStorage.setItem("proddet",JSON.stringify(prodobj)) // saved in the session storage bcoz for faster reloading
        navigate("/Km")
    }

    let addcart = (prodobj)=>{
        if(obj.state.token !==""){
          axios.post("http://localhost:5555/addcart",{"uid":obj.state._id,"pid":prodobj._id,"pimg":prodobj.pimg,"price":prodobj.price,"name":prodobj.name,"qty":1,"desc":prodobj.desc,"cat":prodobj.cat}).then(()=>{
            navigate("/cart")
          })
        }
        else{
          localStorage.setItem("pendingCartItem", JSON.stringify(prodobj));
          navigate("/login")
        }
    }
    let del = (delobj)=>{
        console.log(delobj)
        axios.delete(`http://localhost:5555/delprod/${delobj._id}`).then((res)=>{
            fetchprod()
        })
    }
    let buynow = (buyprod)=>{
        if(obj.state.token !==""){
          navigate("/buynow")
        }
        else{
          navigate("/login")
        }
    }

    return (
        <div className='cardcon'>
        {prod.length > 0 ? (
            prod.map((pobj)=>{
            return ( <div className='card' key={pobj._id}>
            <Card sx={{ maxWidth: 320, boxShadow: '12px 12px 15px rgba(0, 0, 0, 0.4)' }}>
            <CardMedia onClick={()=>knowmore(pobj)}
                sx={{ height: 290,width: 288, margin:2,border:1, cursor:'pointer','&:hover':{opacity:0.8}}}
                image={`http://localhost:5555/pimgs/${pobj.pimg}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"century Gothic"}}>
                {pobj.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic"}}>
                {pobj.desc}
                </Typography><br></br>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic",fontWeight:'bold',fontSize:"20px",color:"black"}}>
                Price : {pobj.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>knowmore(pobj)}>Know More</Button>
                <Button size="small" onClick={()=>addcart(pobj)}>Add Cart</Button>
                {obj.state.role === "user" && <Button size="small" onClick={()=>buynow(pobj)}>Buy now </Button>}
                {obj.state.token !== ""  && obj.state.role === "admin" && <Button size="small" onClick={()=>del(pobj)}>Delete</Button>}
                {obj.state.token !== "" && obj.state.role === "admin" && <Button size="small">Edit</Button>}
            </CardActions>
            </Card>
            </div>)
            })
        ):(
            <div className='noresults'>
                No Results Found
            </div>
        )
        }
        </div>
  )
}

export default Search