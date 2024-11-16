'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://smart-garage-api.vercel.app";

export default function AddCar() {
  
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const imgInputs = {title,description,image};
    // Here you would typically send the data to your backend
    try{
        const response = await axios.post(`${BACKEND_URL}/api/cars/newcar`, imgInputs,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
        const jwt = response.data.token;
        navigate("/cars");  
        }
        catch(e){
          alert("Error while Adding Data");
          console.log(e)
        }
    setTitle('')
    setDescription('')
    setImage([])
  }

  return (
    <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 font-mono mb-12">Add Vehicle</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
           Car Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Car Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
           Car Image
          </label>
          <input
            className="mb-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="url"
            value = {image}
            placeholder='Enter image URL'
            // accept="image/*"
            onChange={(e)=> setImage(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
