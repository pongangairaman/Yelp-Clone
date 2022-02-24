import React,{useState} from 'react';
import axios from 'axios';
import {Button,Input} from 'antd';
import 'antd/dist/antd.css';

const AddRestaurant = ()=> {
  const [name,setName] = useState('');
  const [location,setLocation] = useState('');
  const [price_range,setPrice_range] = useState('');

  const onAdd = (e)=>{
    e.preventDefault();
    try {
      axios.post(`http://localhost:5001/restaurants`,{
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
    <div style={{margin: 100}}>
      <div><h1>Yelp Clone</h1></div>
      <div style={{display: 'flex',justifyContent: 'space-evenly' }}>
        <div><Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" /></div>
        <div><Input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" /></div>
        <div><Input value={price_range} onChange={(e)=>setPrice_range(e.target.value)} placeholder="Price Range" /></div>
        <div><Button type="primary" onClick={onAdd}>Add</Button></div>  
      </div>      
    </div>
  );  
}
export default AddRestaurant;