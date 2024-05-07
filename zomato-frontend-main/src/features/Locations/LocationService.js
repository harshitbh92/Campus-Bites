import axios from "axios";

const getLocations = async()=>{
    const response = await axios.get('http://localhost:5000/location/get-location-list');
    if(response.data)
    {
        console.log(response.data);
        return response.data;
    }
}

export const LocationService = {
    getLocations,
}