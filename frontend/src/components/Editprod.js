import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Cs'

const Editprod = () => {
    let navigate = useNavigate()
    let obj = useContext(Ct)
    let fd = new FormData()
    let [data, udata] = useState({ "_id": "", "name": "", "cat": "", "desc": "", "price": "" })
    let fun = (e) => {
        udata({ ...data, [e.target.name]: e.target.value })
    }
    let fun1 = (e) => {
        fd.append("pimg", e.target.files[0])
    }
    useEffect(() => {
        let data = obj.state.proddet
        delete data['comm']
        udata({ ...data })
    }, [])
    let edit = () => {
        if (data.name !== "" && data.price !== "" && data.desc !== "" && data.cat !== "" && data._id !== "") {
            axios.put("http://localhost:5555/edit", data).then(() => {
                const conf = window.confirm("Details updated. Do you want to go to the home page?");
                if (conf) {
                    navigate("/");
                }
            })
        }
        else {
            alert("please fill all the details")
        }
    }

    let editimg = () => {
        fd.append("_id", data._id)
        fd.append("oldimg", data.pimg)
        axios.put("http://localhost:5555/editimg", fd).then(() => {
            const conf = window.confirm("Image updated. Do you want to go to the home page?");
            if (conf) {
                navigate("/")
            }
        })
    }

    return (
        <div className='editcon'>
            <div className="form-control">
                <p className="title">Edit Product</p>
                <div className="input-field">
                    <input required="" className="input" type="text" name='name' onChange={fun} value={data.name} />
                    <label className="label" for="input">Enter name of product</label>
                </div>
                <div className="input-field">
                    <input required="" className="input" type="text" name='cat' onChange={fun} value={data.cat} />
                    <label className="label" for="input">Enter cat of product</label>
                </div>
                <div className="input-field">
                    <input required="" className="input" type="text" name='price' onChange={fun} value={data.price} />
                    <label className="label" for="input">Enter price of product</label>
                </div>
                <div className="input-field">
                    <textarea className="input" rows={4} name='desc' onChange={fun} value={data.desc} ></textarea>
                    <label className="label" for="input">Enter description</label>
                </div>
                <button className="submit-btn" onClick={edit}>Update Details</button>
            </div>
            <div className='form-control'>
                <span class="form-title">Upload Image</span>
                <p class="form-paragraph">
                    File should be an image
                </p>
                <label for="file-input" class="drop-container">
                    <span class="drop-title">Drop Image here</span>
                    or
                    <input type="file" accept="image/*" required="" id="file-input" onChange={fun1} />
                </label>
                <button className="submit-btn" onClick={editimg}>Update Image</button>
            </div>
        </div>
    )
}

export default Editprod