import axios from "axios";

const getallRestro = async()=>{
    const response = await axios.get('http://localhost:5000/restro/');
    console.log(response.data);
    if(response.data)
        {
            return response.data;
        }
}
const getRestroByLoc = async(id)=>{
    const response = await axios.get(`http://localhost:5000/restro/get-restaurant-list-by-loc-id/${id}`);
    if(response.data)
        {
            return response.data;
        }
};

export const RestroService = {
    getRestroByLoc,
    getallRestro,
}