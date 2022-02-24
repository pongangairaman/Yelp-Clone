import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Table} from 'antd';
import 'antd/dist/antd.css';

{/*
    restaurantList.map(restaurant =>{

    })
*/}


  function ListRestaurant(){
      
    const [restaurantList,setRestaurantList]=useState([]);
    //const [datasource,setDataSource]=useState([]);
    //console.log('Hello 1')
    //console.log(restaurantList);
    const getRestaurantList = async ()=>{
        try {
            //console.log('Hello 3')
            /*const response = await fetch('http://localhost:5001/restaurants');
            const body = await response.json();
            setRestaurantList(body.data);*/
            //console.log(data);
            axios.get(`http://localhost:5001/restaurants`)
            .then(
              res =>{
                console.log(res.data.data);
                const body = res.data.data
                setRestaurantList(body);
              }
            )
        } catch (err) {
            //console.log('Hello 4')
            console.error(err.mesage);
        }
    }
    useEffect(()=>{
        //console.log('Hello 2')
        getRestaurantList();
    },[])
    const dataSource1 = [
    {
      id: '1',
      name: 'Super_Hotel',
      location: 'Bangalore',
      price_range: '3',
      //review: 'Stars',
      //editButton: <button>Edit</button>,
      //deleteButton: <button>Delete</button>
    },
    {
      id: '2',
      name: 'Awesome_Hotel',
      location: 'Chennai',
      price_range: '3',
      //review: 'Stars',
      //editButton: <button>Edit</button>,
      //deleteButton: <button>Delete</button>
    }
  ];
  //console.log(dataSource);
  {/*
      const newButton = {editButton : <button>Edit</button>}
      dataSource1.map(_dataSource1=>(
      dataSource1 = {...dataSource1,newButton}
      
    ))
      */}

  const columns = [
    {
      key: '1',
      title: 'id',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'location',
      dataIndex: 'location',
    },
    {
      key: '4',
      title: 'price_range',
      dataIndex: 'price_range',
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review'
    },
   {
      title: 'Edit',
      key: '5',     
      render: ({ row }) => (<button onClick={(e) =>handleButtonEdit(e, row)}>Edit</button>)
    },
    {
      title: 'Delete',
      key: '6',
      render: ({ row }) => (<button onClick={(e) => handleButtonDelete(e,row)}>Delete</button>)
    }
  ];
  const handleButtonEdit = () => {
    console.log('Edit button woeks');
   
  };
  const handleButtonDelete = () => {
        console.log('Delete button works')
        
    }
  console.log(restaurantList);
  console.log(dataSource1)
  
    
    return(
        <div style={{marginLeft:100,marginRight:100}}>
            <Table  dataSource={restaurantList} columns={columns} />
            
        </div>
        

    )
  }

export default ListRestaurant;