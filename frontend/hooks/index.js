import { useEffect,useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export const useCars = () => {
    const [loading,setLoading] = useState(true);
    const [cars,setCars] = useState([])

    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/cars`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response=>{
            setCars(response.data);
            setLoading(false);
        })
        .catch(error=>{
            setLoading(false);
            console.error(error);
        })
    },[])

    return {
        loading,
        cars
    }
}

export const useCar = (id) => {
    const [loading,setLoading] = useState(true);
    const [car,setCar] = useState('');
    console.log(id);
    useEffect(()=>{
         axios.get(`${BACKEND_URL}/api/cars/${id}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response=>{
            setCar(response.data);
            setLoading(false);
        })
        .catch(error=>{
            setLoading(false);
            console.error(error);
        })
    },[])

    return {
        loading,
        car
    }
}