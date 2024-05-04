import { useState } from "react";
import "./addUser.css"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import toast from "react-hot-toast"
const AddUser = () => {
    const users= {
        first_name : "",
        last_name: "",
        email: "",
        password: ""
    }
    const [user , setUser] = useState(users)
    const navigate = useNavigate()
    const inputHandler = (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]: value})
    }

    const submitData =async (e)=>{
        e.preventDefault();

        await axios.post(`http://localhost:5000/api/user/create`,user)
        .then((res)=>{
            toast.success(res.data.message, {position: "top-right"})
            navigate("/")
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    return (
        <>
           <div className="addUser">
            <Link to={"/"}>Back</Link>
            <h2>Add New User</h2>
            <form className="addUserForm" onSubmit={submitData}>
                <div className="inputGroup">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" onChange={inputHandler} name="first_name" id="first_name" autoComplete="off" placeholder="First Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" onChange={inputHandler} name="last_name" id="last_name" autoComplete="off" placeholder="Last Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} name="email" id="email" autoComplete="off" placeholder="Email"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} name="password" id="password" autoComplete="off" placeholder="Password"/>
                </div>
                <div className="inputGroup">
                    <button type="submit">ADD USER</button>
                </div>
            </form>
           </div>
        </>
    );
};

export default AddUser;