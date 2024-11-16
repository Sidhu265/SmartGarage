import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"

const BACKEND_URL = "http://localhost:3000";

export const Auth = ({type}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState({
        name: " ",
        email: " ",
        password: " "
    })


    async function sendRequestSignup() {
        try{
        const response = await axios.post(`${BACKEND_URL}/api/users/signup`, postInputs);
        const jwt = response.data.token;
        navigate("/signin");  
        }
        catch(e){
          alert("Error while Signing Up");
          console.log(e.response.data)
        }
  
    }

    async function sendRequestSignin() {
      try{
      const response = await axios.post(`${BACKEND_URL}/api/users/signin`, postInputs);
      const jwt = response.data.token;
      try {
        localStorage.setItem("token", jwt);
      } catch (error) {
        console.error("Error setting JWT in localStorage:", error);
      }
      navigate("/cars");  
      }
      catch(e){
        alert("Error while Signing in")
        console.log(e.response.data)
      }

    }

    return <div className="flex justify-center items-center h-screen flex-col">
        <div className="flex justify-center">
        <div>
        <div className="text-4xl font-bold">
            Create an account
        </div>
        <div className="text-slate-600">
           {type === "signup" ? "Already have an account ? " : "Don't have an account ? " }
           <Link className="underline" to={ type==='signup' ? '/signin' : '/signup'}>
           {type==='signup' ? 'Login' : "Sign Up"}
           </Link>
        </div>
        </div>
        </div>
        <LabelledInput label="Username" placeholder="Enter Username" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }}/>
        <LabelledInput label="Password"  type={"password"} placeholder="Enter Password" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }}/>

        {type === 'signup' && <LabelledInput label="Name" placeholder="Enter Name" onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name: e.target.value
          })
        }}/>}

       <button onClick = {type === 'signup' ? sendRequestSignup : sendRequestSignin} className="w-[320px] rounded-md bg-blue-600 text-white p-2 mt-8 ">{type === "signup" ? "Sign Up" : "Sign In"}</button>
    </div>
}

function LabelledInput({label, placeholder, type,onChange}) {
    return <div className="w-[420px] mt-1"> 
     <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <input onChange={onChange} type={ type ||"text"} id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
</div> 
}