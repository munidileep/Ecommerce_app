import React, { useContext, useEffect } from 'react'
import Ct from './Cs'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(()=>{
    obj.upd({"token":"","name":"","_id":"","role":""})
    navigate("/")
  },[])
  return (
    <div>logout</div>
  )
}

export default Logout