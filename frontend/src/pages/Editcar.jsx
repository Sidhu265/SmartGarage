import {React,useEffect} from 'react'
import { useCar } from '../../hooks';
import { useParams,Link,useNavigate } from 'react-router-dom';
import axios from "axios";
const BACKEND_URL = "http://localhost:3000"



export default function Editcar() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {loading,car} = useCar(id);
    if(loading)
        return <div className='text-2xl'>Loading...</div>
    else {
  return (
    <div>
       <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-screen">
            <div className="p-4 w-full flex justify-center">
              <h2 className="text-xl font-semibold mb-2 flex-1">{car.title}</h2>
              <div className="space-y-2">
                <p className='text-md font-semibold ml-2 '><span className="font-semibold text-xl"> </span> {car.description}</p>
              </div>
            </div>
            
            <div className="relative w-full ">
              <img
                src={car.image}
                alt={`${car.title} vehicle`}
                fill
                className="object-cover w-full h-[580px]"
              />
            </div>
            <div className='flex flex-row gap-1 mt-2 relative'>
            <button className='bg-red-500 p-2 text-white font-mono ml-[1360px] rounded-lg' onClick={DeleteCar}>Delete</button>
            <Link to={'/cars'}> <button className='bg-green-800 p-2 flex-1 text-white font-mono rounded-lg'>Go Back</button></Link>
            </div>
          </div>
          
    </div>
  )
}
async function DeleteCar() {
    try{
       await axios.delete(`${BACKEND_URL}/api/cars/${id}`,{
           headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
           }
        })
        navigate('/cars');
       alert("Data Deleted Successfully!")
    }
    catch(e){
        console.error(e);
    }
   return 0;
    
}
}



