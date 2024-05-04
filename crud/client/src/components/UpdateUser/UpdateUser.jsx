import {Link, useNavigate, useParams}from "react-router-dom"
import "./../AddUser/addUser.css"
import { useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
const UpdateUser = () => {

    const users ={
        first_name: "",
        last_name: "",
        email: "",
    } 
    const navigate = useNavigate()
    const {id} = useParams()
    const [user, setUser] = useState(users)
    const inputOnChange = (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        // console.log(user)
    }

    useEffect(()=>{
        ;(async()=>{
            await axios
        .get(`http://localhost:5000/api/user/singleUser/${id}`)
        .then((res) => {
            // console.log(res.data)
          setUser(res.data['data']);
        })
        .catch((err) => {
          console.log(err);
        });
        })()
    },[])

    const submitData =async (e)=>{
        e.preventDefault();

        await axios.put(`http://localhost:5000/api/user/updateUser/${id}`,user)
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
            <h2>Update User</h2>
            <form className="addUserForm" onSubmit={submitData}>
                <div className="inputGroup">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" value={user.first_name} onChange={inputOnChange} name="first_name" id="first_name" autoComplete="off" placeholder="First Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" value={user.last_name} onChange={inputOnChange} name="last_name" id="last_name" autoComplete="off" placeholder="Last Name"/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputOnChange} name="email" id="email" autoComplete="off" placeholder="Email"/>
                </div>
                
                <div className="inputGroup">
                    <button type="submit">UPDATE USER</button>
                </div>
            </form>
           </div>
        </>
    );
};

export default UpdateUser;