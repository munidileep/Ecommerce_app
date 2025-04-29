import React, { useContext } from 'react'
import { Avatar } from "@mui/material";
import { orange } from '@mui/material/colors';
import Ct from './Cs';

const Profile = () => {
    let obj = useContext(Ct)

    return (
        <div className='editcon'>
            <div className='profile-card'>
                <div className='profile-image'>
                    <Avatar sx={{ bgcolor: orange[900], width: 90, height: 90, fontSize: 55, fontWeight: "bold" }}>{obj.state.name[0].toUpperCase()}</Avatar>
                    <p>{obj.state.name}</p>
                </div>
                <div className='profile-details'>
                    <div className='details-values'> <i class="fa-solid fa-envelope"></i> Mail : {obj.state._id}</div><hr></hr>
                    <div className='details-values'> <i class="fa-solid fa-phone"></i> Phno : {obj.state.phno}</div><hr></hr>
                    <div className='details-values'> <i class="fa-solid fa-person-half-dress"></i> Gender : {obj.state.gen}</div><hr></hr>
                    <div className='details-values'> <i class="fa-solid fa-map-location-dot"></i> Address : {obj.state.address}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile