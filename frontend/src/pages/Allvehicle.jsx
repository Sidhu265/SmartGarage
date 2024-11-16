import React, { useState } from 'react'
import { useCars } from '../../hooks'
import { Link } from 'react-router-dom'
import Editcar from './Editcar'

const VehicleList = () => {
  const [companyFilter, setCompanyFilter] = useState('')

  const {loading,cars} = useCars();
  
  if(loading)
    return <div className='flex justify-center text-2xl'>Loading...</div>
  else{

    const filteredVehicles = cars
    .filter(vehicle => 
      companyFilter === '' || 
      vehicle.title.toLowerCase().includes(companyFilter.toLowerCase())
    )
  

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 font-mono">Vehicle List</h1>
      <Link to={'/signin'}><button className='bg-blue-200 font-semibold text-mono p-1 ml-[1400px] font-semibold '>Logout</button></Link>
      <div className='flex gap-2' >
       <div className="inline-flex items-center gap-2">
          <span className="whitespace-nowrap">Search:</span>
          <input
            type="text"
            placeholder='Enter Car Name'
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 max-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
        </div>

        <Link to={'/addcar'}><button className='bg-green-500 w-20 rounded-sm p-1 mt-2 border-black font-mono font-bold'>ADD CAR</button></Link>
        </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => (
         <Link to = {`/car/${vehicle._id}`}>
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{vehicle.title}</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">DESCRIPTION:</span> {vehicle.description}</p>
              </div>
            </div>
            
            <div className="relative h-[200px]">
              <img
                src={vehicle.image}
                alt={`${vehicle.title} vehicle`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}
}

export default VehicleList