import React,{useState,createContext} from 'react';

export const RestaurantContext = createContext(); 

export const RestaurantContextProvider = (props)=>{
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

    return(
        <RestaurantContext.Provider value={{
            name,
            setName,
            location,
            setLocation,
            price_range,
            setPrice_range,
            onAdd
        }}>
            {props.children}
        </RestaurantContext.Provider>
    );
};

