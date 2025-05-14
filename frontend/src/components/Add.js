import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Add = () => {
  let navigate = useNavigate()
  let[data,udata]=useState({"name":"","cat":"","desc":"","price":"","pimg":""})
  let fun=(e)=>{
    udata({...data,[e.target.name]:e.target.value})
  }
  let fun1=(e)=>{
    udata({...data,"pimg":e.target.files[0]})
  }
  let add=()=>{
    if(data.name !== "" && data.price !== "" && data.desc !== "" && data.cat !== "" && data.pimg !== ""){
      let fd = new FormData()
      for(let i in data){
        fd.append(i, data[i])
      }
      axios.post("http://localhost:5555/addprod",fd).then((res)=>{
        navigate("/")
      })
    }
    else{
      alert("please fill all the details")
    }
  }
  return (
    <div className='formcon'>
      <div className="form-control">
          <p className="title">Add Product</p>
          <div className="input-field">
            <input required="" className="input" type="text" name='name' onChange={fun} />
            <label className="label" htmlFor="input">Enter name of product</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type="text" name='cat' onChange={fun} />
            <label className="label" htmlFor="input">Enter cat of product</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type="text" name='price' onChange={fun} />
            <label className="label" htmlFor="input">Enter price of product</label>
          </div>
          <div className="input-field">
            <textarea className="input" rows={4} name='desc' onChange={fun}></textarea>
            <label className="label" htmlFor="input">Enter description</label>
          </div>
          <input type='file' id="file-input" name='pimg' onChange={fun1}/>
          <button className="submit-btn" onClick={add}>Add Product</button>
      </div>
    </div>
  )
}

export default Add