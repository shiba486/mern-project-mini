import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "./user.css";


const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ;(async() => {
      await axios
        .get(`http://localhost:5000/api/user/allUser`)
        .then((res) => {
            let data = res.data['data']
          setUsers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  },[]);

  const deleteUser = async (userId)=>{
    await axios.delete(`http://localhost:5000/api/user/deleteUser/${userId}`)
    .then((res)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId))
      toast.success(res.data.message, {position: "top-right"})
    })
    .catch((err)=>{
      console.log(err.message)
    })

  }
  return (
    <div className="userTable">
      <Link to={"/add"} className="addBtn">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody>
         {users.map((user,index)=>{
            return (
                <tr key={index}>
              <td>{index}</td>
              <td>{user.first_name} {user.lastname}</td>
              <td>{user.email}</td>
              <td className="actionBtns">
                <button onClick={()=>{deleteUser(user._id)}}>Delete</button>
                <Link to={"/edit/"+ user._id}>Edit</Link>
              </td>
            </tr>
            )
         })}
                
        </tbody>
      </table>
    </div>
  );
};

export default User;
