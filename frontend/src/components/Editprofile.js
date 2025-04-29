import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Ct from './Cs'

const Editprofile = () => {
    let navigate = useNavigate()
    let obj = useContext(Ct)
    let [fdata, udata] = useState({ "_id": "", "name": "", "phno": "", "gen": "", "address": "" })
    
    let fun = (e) => {
        udata({ ...fdata, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        udata({"_id":obj.state._id,"name":obj.state.name,"gen":obj.state.gen,"address":obj.state.address,"phno":obj.state.phno})
    }, [])

    let edit = () => {
        if (fdata.name !== "" && fdata._id !== "" && fdata.address !== "" && fdata.phno !== "" && fdata.gen !== "") {
            axios.put("http://localhost:5555/editprofile", fdata).then(() => {
                obj.upd(fdata);
                navigate("/")
            })
        }
        else {
            alert("please fill all the details")
        }
    }
    return (
        <div className='formcon'>
        <div className="form-control">
          <p className="title">Edit Profile</p>
          <div className="input-field">
            <input required="" className="input" type="text" name='_id' value={fdata._id} onChange={fun} />
            <label className="label" for="input">Enter Email</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type='text' name='name' value={fdata.name} onChange={fun} />
            <label className="label" for="input">Enter name</label>
          </div>
          <div className="input-field">
            <select name='gen' value={fdata.gen} onChange={fun} className='input'>
              <option value="" disabled>-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="label" for="input">Enter Gender</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type="text" name='phno' value={fdata.phno} onChange={fun} />
            <label className="label" for="input">Enter phno</label>
          </div>
          <div className="input-field">
            <textarea required="" className="input" rows={4} name='address' value={fdata.address} onChange={fun}></textarea>
            <label className="label" for="input">Enter Address</label>
          </div>
          <button className="submit-btn" onClick={edit}>Update</button>
          <div className='details-valuesb'>To Change Password : <Link className='forgot' to="/forgotpass"> Click here</Link></div>
        </div>
      </div>
    )
}

export default Editprofile