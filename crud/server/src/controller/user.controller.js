import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


//user create
export const createUser = async (req, res) => {
  try {
    // get user details from frontend

    const { first_name, email, last_name, password } = req.body;

    // validation -not empty
    if (
      [first_name, email, last_name, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All field are required");
    }

    // check if user already exists
    const existedUser = await User.findOne({
      email: email,
    });
    if (existedUser) {
      throw new ApiError(409, "Username Or Email is Alreary Exist");
    }

    // crate user object - create entry in db
    const createUser = await User.create({
      first_name,
      last_name,
      email,
      password,
    });
    // check for user creation
    if (!createUser) {
      throw new ApiError(
        500,
        "Something went wrong while user registering is not "
      );
    }

    const token = await createUser.generateAccessToken();

    const options = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options);
    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "user registration successfull"));
  } catch (error) {
    console.log(error)
    return res
      .status(200)
      .json(new ApiResponse(500, error, "user registration fail"));
  }
};


//get all user
export const getAllUser = async (req, res) => {
  
  try {
    const existedUser = await User.find();
    //query in db
  if(!existedUser){
    throw new ApiError(409, "internal error");
  }

  return res
      .status(200)
      .json(new ApiResponse(200, existedUser, "successfull"));
  } catch (error) {
    console.log(error);
    throw new ApiError(409, "Internal Server Error");
  }
};

//get one user
export const getOneUser = async (req, res) => {
   const id = req.params["userId"]
    try {
      const existedUser = await User.findById(id);
      //query in db
    if(!existedUser){
      throw new ApiError(409, "invalid credential");
    }
  
    return res
        .status(200)
        .json(new ApiResponse(200, existedUser, "successfull"));
    } catch (error) {
    //   console.log(error);
      throw new ApiError(409, "Internal Server Error");
    }
  };
  

//update user
export const updateUser = async (req, res) => {
   const id = req.params["userId"]
    try {
      const existedUser = await User.findById(id);
      //query in db
    if(!existedUser){
      throw new ApiError(409, "invalid credential");
    }
    const updateUser = await User.findByIdAndUpdate(id,req.body, {new: true})  
    return res
        .status(200)
        .json(new ApiResponse(200, updateUser, "user updated"));
    } catch (error) {
    //   console.log(error);
      throw new ApiError(409, "Internal Server Error");
    }
  };
  

//delete user
export const deleteUser = async (req, res) => {
    const id = req.params["userId"]
    try {
      const existedUser = await User.findById(id);
      //query in db
    if(!existedUser){
      throw new ApiError(409, "invalid credential");
    }
    const deleteUser = await User.findByIdAndDelete(id)  
    return res
        .status(200)
        .json(new ApiResponse(200, updateUser, "User deleted successfully"));
    } catch (error) {
    //   console.log(error);
      throw new ApiError(409, "Internal Server Error");
    }
  };
  
