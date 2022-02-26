import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function RestaurantListNew(){
    const navigate = useNavigate();
    const [restaurantListNew, setRestaurantListNew] = useState([]);
    const getRestaurantListNew = async ()=>{
        try {
            axios.get(`http://localhost:5001/restaurants`)
            .then(
              res =>{
                console.log(res.data.data);
                const body = res.data.data
                setRestaurantListNew(body);
              }
            )
        } catch (err) {
            console.error(err.mesage);
        }
    }
    useEffect(()=>{
        getRestaurantListNew();
    },[])
    console.log(restaurantListNew);

    const deleteRestaurant= async (e,id) =>{
        e.stopPropagation();
        try {
            axios.delete(`http://localhost:5001/restaurants/${id}`)
            .then(
                res=>{
                    console.log(res.data.data);
                    setRestaurantListNew(restaurantListNew.filter(restaurantListNew1=>restaurantListNew1.id != id));
                }
            )
        } catch (err) {
            console.error(err.message);
        }
    }

    const updatePage = (e,id)=>{
        e.stopPropagation();
        //console.log(id);
        console.log("navigation working");
        navigate(`restaurants/${id}/update`)
        //console.log("let's see")
    }
    const handleDetailPage=(id)=>{
        console.log(id);
        navigate(`restaurants/${id}/detail`)
    }
    return(
        <div style={{"margin":"0px 150px 150px 150px"}}>
            <table className="table">
                <thead>
                <tr>
                    <th >Name</th>
                    <th >Location</th>
                    <th >Price Range</th>
                    <th >Review</th>
                    <th className="text-center"> Edit</th>
                    <th className="text-center">Delete</th>
                </tr>
                </thead>
                <tbody>
                    {restaurantListNew.map(restaurantListNew1 => (
                        <tr key={restaurantListNew1.id}  onClick={()=>handleDetailPage(restaurantListNew1.id)}>
                            <td>{restaurantListNew1.name}</td>
                            <td>{restaurantListNew1.location}</td>
                            <td>{restaurantListNew1.price_range}</td>
                            <td>Review</td>
                            <td className="text-center">
                                <button className="btn btn-warning" onClick={(e)=>updatePage(e,restaurantListNew1.id)}>Edit</button>
                            </td>
                            <td className="text-center">
                                <button className="btn btn-danger" onClick = {(e)=>deleteRestaurant(e,restaurantListNew1.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    )}
               
                </tbody>
            </table>
        </div>
    )
}
export default RestaurantListNew;