import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Button,Input} from 'antd';
import 'antd/dist/antd.css';
import {useParams} from 'react-router-dom'


function EditRestaurantListNew(props) {
   const {id} = useParams();
   console.log(id);
    const [name,setName] = useState([]);
    const [location,setLocation] = useState([]);
    const [price_range,setPrice_range] = useState([]);

    const getRestaurantListNew = async (id)=>{
    try {
        axios.get(`http://localhost:5001/restaurants/${id}`)
        .then(
          res =>{
            console.log(res.data.data);
            const body = res.data.data;
            setName(body.restaurant.name);
            setLocation(body.restaurant.location);
            setPrice_range(body.restaurant.price_range);
          }
        )
    } catch (err) {
        console.error(err.mesage);
    }
}
    useEffect(()=>{
        getRestaurantListNew(id);
    },[])

    const onUpdate = (e)=>{
        e.preventDefault();
        try {
          axios.put(`http://localhost:5001/restaurants/${id}`,{
            name: name,
            location: location,
            price_range: price_range
          })
          .then(res =>{
            //console.log(res);
            console.log(res.data.data);
            setName('');
            setLocation('');
            setPrice_range('')
          })
          window.location='/'
        } catch (err) {
          console.log(err.message);
        }
      }

  return (
    <div>
      <div className='align-items-center' style={{display: 'flex',flexDirection: 'column', justifyContent: 'space-evenly', marginTop: '150px' }}>
        <h2>Udate Restaurant</h2>
        <div style={{marginTop: '20px'}}><h6>Name</h6><Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" /></div>
        <div style={{marginTop: '20px'}}><h6>Location</h6><Input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" /></div>
        <div style={{marginTop: '20px'}}><h6>Price Range</h6><Input value={price_range} onChange={(e)=>setPrice_range(e.target.value)} placeholder="Price Range" /></div>
        <div style={{marginTop: '50px'}}><Button type="primary" onClick={onUpdate}>Update</Button></div>  
      </div>
    </div>
  )
}

export default EditRestaurantListNew;