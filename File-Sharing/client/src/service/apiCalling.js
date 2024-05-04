import axios from "axios"

const API_URL = "http://localhost:5000"

export const FileUpload = async(data)=>{
    try {
        const res = await axios.post(`${API_URL}/upload`,data)
        // console.log(res)
        return res.data
    } catch (error) {
        console.log(`Error while calling api`, error.message)
    }
}