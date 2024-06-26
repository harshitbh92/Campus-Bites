import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const Home = () => {
  const navigate = useNavigate();
  let initData = {
    _id: "",
    name: "",
    city_id: 0,
    location_id: 0,
    city: "",
    country_name: "",
  };
  let restaurantinitData = {
    _id: "",
    name: "",
    city: 0,
    locality: 0,
    image: "",
  };
  const [meals, setMeals] = useState([]);
  const [locations, setLocations] = useState([]);
  const [hideLocation, setHideLocation] = useState(true);
  let [selectLocation, setSelectLocation] = useState({ ...initData });
  const [restaurants, setRestaurants] = useState([]);
  const [hideRestaurant, setHideRestaurant] = useState(true);
  let [selectRestaurant, setSelectRestaurant] = useState({
    ...restaurantinitData,
  });

  let setASelectedLocation = (index) => {
    setHideLocation(true);
    setSelectLocation(locations[index]);
  };
  let setASelectedRestaurant = (index) => {
    setHideRestaurant(true);
    setSelectRestaurant(restaurants[index]);
  };
  let getMealTypeList = async () => {
    try {
      // let url = "https://zomato-haj8.onrender.com/api/get-meal-type-list";
      let url = 'http://localhost:5000/meal/get-meal-type-list';
      let response = await axios.get(url);
      let data = response.data;
      console.log(data.result);
      setMeals(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  let getLocationList = async () => {
    try {
      // let url = "https://zomato-haj8.onrender.com/api/get-location-list";
      let url = "http://localhost:5000/location/get-location-list";

      let response = await axios.get(url);
      let data = response.data?.Locations;
      console.log(data);
      setLocations(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getRestaurantListByLocId = async () => {
    try {
      // let url = `https://zomato-haj8.onrender.com/api/get-restaurant-list-by-loc-id/${selectLocation.location_id}`;
      let url = `http://localhost:5000/restro/get-restaurant-list-by-loc-id/${selectLocation.location_id}`;
      let response = await axios.get(url);
      let data = response.data;
      console.log(data);
      setRestaurants(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // call api on mounting
  useEffect(() => {
    getMealTypeList();
    getLocationList();
  }, []);

  useEffect(() => {
    if (selectLocation.location_id !== 0) {
      getRestaurantListByLocId();
      setHideRestaurant(false);
    }
  }, [selectLocation]);

  return (
    <div>
       <Header />
      <div className="filterbox mt-0">
       

        <div className="top-header">
          <div className="container">
            <div className="logo-div">
              <div className="biglogo rounded-circle bg-light m-auto text-danger d-flex justify-content-center align-items-center display-1 fw-bold">
                e!
              </div>
            </div>
          </div>
          <div className="container">
            <h1 className="text-light mt-3 text-center findtext">
              {" "}
              Find the best restaurants, cafés, and bars
            </h1>
            <div className="row w-75  m-auto g-3 cus-w">
              <div className="col-md-4">
                {/* <select className="form-select form-select p-3 rounded-0 text-body-tertiary ps-4 default-form"
                                aria-label="Default select example">

                                <option selected> Please type a location</option>
                              {
                                location.map((locat)=>{
                                    return( <option value={locat.location_id}>{locat.name} {locat.city}</option>
                                    )
                                })
                              }  
                              
                            </select> */}
                <div className="position-relative">
                  <input
                    className="form-control "
                    readOnly
                    onClick={() => setHideLocation(false)}
                    type="text"
                    value={
                      selectLocation.name === ""
                        ? "Please select a location"
                        : selectLocation.name + "," + selectLocation.city
                    }
                    placeholder="Select a Location"
                  />

                  {hideLocation ? null : (
                    <ul className="list-group position-absolute w-100">
                      {locations.map((location, index) => {
                        return (
                          <li
                            key={location._id}
                            onClick={() => setASelectedLocation(index)}
                            className="list-group-item"
                          >
                            {location.name}, {location.city}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <span className="svg">
                  <svg
                    fill="rgba(33, 37, 41, 0.5)"
                    strokeWidth="10"
                    stroke="rgba(33, 37, 41, 0.5)"
                    className="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </span>
                <div className="position-relative">
                  <input
                    className="form-control ps-5 pt-2"
                    readOnly
                    onClick={() => setHideRestaurant(false)}
                    type="text"
                    value={
                      selectRestaurant.name === ""
                        ? "Search for restaurants"
                        : restaurants.length +
                          " restaurants found" +
                          selectRestaurant.name +
                          "," +
                          selectRestaurant.city
                    }
                  />

                  {hideRestaurant ? null : (
                    <ul className="list-group position-absolute w-100">
                      {restaurants.map((restaurant, index) => {
                        return (
                          <li
                            key={restaurant._id}
                            onClick={() =>
                              navigate("/restaurant-details/" + restaurant._id)
                            }
                            className="list-group-item"
                          >
                            <img
                              className="rounded-circle me-3"
                              style={{ width: "60px", height: "60px" }}
                              src={`/images/${restaurant.image}` } alt='img'
                            />
                            {restaurant.name}, {restaurant.city}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {/* <select
                                    className="form-select form-select p-3 rounded-0  text-body-tertiary ps-4 default-form default-form2"
                                    aria-label="Default select example">
                                    <option> Search for restaurents</option>
                                    <option value="The Bill Chill Cakery">img The Bill Chill Cakery</option>
                                    <option value="Punjabi Rasaoi">Punjabi Rasaoi</option>
                                    <option value="Punjabi Rasaoi">Punjabi Rasaoi</option>
                                </select> */}
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
      {/*End of filterbix*/}
      <main>
        <div className="main-container">
          <div className="container">
            <div className="heading mt-5">
              <h1 className="text-edu">Quick Searches</h1>
              <p className="text-body-tertiary">
                Discover restaurants by type of meal
              </p>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row">
              {/* <!--start of col--> */}
              {meals && meals.map((meal, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      navigate(`/search/${meal.meal_type}/${meal.name}`)
                    }
                    className="col-12 col-md-6 col-lg-6 col-xl-4 mt-4"
                  >
                    <div className="card mb-3  rounded-0 p-0 border-0 cus-card">
                      <div className="row g-0">
                        <div className="col-5 col-md-5 col-sm-5">
                          <img
                            src={"/images/" + meal.image}
                            className="img-fluid "
                            alt="..."
                          />
                        </div>
                        <div className="col-7 col-md-7 col-sm-7">
                          <div className="card-body px-3 pb-0">
                            <h5 className="card-title text-edu fw-bold mt-2 text-dark">
                              {meal.name}
                            </h5>
                            <p className="text-body-secondary">
                              {meal.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <!--end of col--> */}
            </div>
          </div>
        </div>
      </main>
      <div className="container mt-5">
        <h1 className="text-edu font-bolder h4 mb-3">
          Frequently Asked Questions
        </h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How do I Claim a Free Coupon?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Coupons are free to claim, use the search or find somewhere
                close by using the Google Map View. Once you've found a great
                coupon offer, click the day you wish to use it, fill out your
                details to complete. You'll instantly receive your free coupon
                to your email inbox To redeem - simply present coupon to staff
                when paying.{" "}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How do I Make a regular Table Booking?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                It's a piece of cake - once you've found your preferred
                restaurant simply select your Date and Time required, and then
                so long as we have an email address and phone number your
                booking is instantly confirmed the minute you hit "Book"
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How can I be certain my booking's been received?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                We'll send an instant confirmation email to the address used in
                your booking. If you book more than a day ahead, we'll also send
                a reminder 24 hours before your booking is due. You can
                reconfirm your booking using a link in your reminder email.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                What happens if I don't reconfirm my booking?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Don't worry, your restaurant will still hold your booking
                without a reconfirmation.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;


// /*import Header from "./Header";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getLocations } from "../features/Locations/LocationSlice";
// import Footer from "./Footer";
// import { getAllRestro, getRestroByLoc } from "../features/Restraunts/RestroSlice";
// const Home = () => {
//   const RestroState = useSelector((state) => state?.restaurants?.restaurant);

//   const LocationState = useSelector(
//     (state) => state?.locations?.location?.Locations
//   );
//   console.log(RestroState);
//   const dispatch = useDispatch();
//   //   alert(grid);
//   useEffect(() => {
//     getallLocations();
//   }, []);

//   const getallLocations = () => {
//     dispatch(getLocations());
//   };
//   //   alert(grid);
//   useEffect(() => {
//     getallRestaurants();

//   }, []);

//   const getallRestaurants = () => {
//     dispatch(getAllRestro());
//   };

//   const getRestByLoc = (id) => {
//     dispatch(getRestroByLoc(id))
//   }


//   const navigate = useNavigate();
//   let initData = {
//     _id: "",
//     name: "",
//     city_id: 0,
//     location_id: 0,
//     city: "",
//     country_name: "",
//   };
//   let restaurantinitData = {
//     _id: "",
//     name: "",
//     city: 0,
//     locality: 0,
//     image: "",
//   };
//   const [meals, setMeals] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [hideLocation, setHideLocation] = useState(true);
//   let [selectLocation, setSelectLocation] = useState({ ...initData });
//   const [restaurants, setRestaurants] = useState([]);
//   const [hideRestaurant, setHideRestaurant] = useState(true);
//   let [selectRestaurant, setSelectRestaurant] = useState({
//     ...restaurantinitData,
//   });

//   let setASelectedLocation = (index) => {
//     setHideLocation(true);
//     setSelectLocation(LocationState[index]);
//   };
//   let setASelectedRestaurant = (index) => {
//     setHideRestaurant(true);
//     setSelectRestaurant(RestroState[index]);
//   };
//   let getMealTypeList = async () => {
//     try {
//       let url = "https://zomato-haj8.onrender.com/api/get-meal-type-list";
//       let response = await axios.get(url);
//       let data = response.data;
//       setMeals(data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   let getLocationList = async () => {
//     try {
//       // let url = "http://localhost:5000/location/get-location-list";
//       let response = await axios.get(
//         "http://localhost:5000/location/get-location-list"
//       );
//       let data = response.data;
//       console.log(data);
//       setLocations(data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const getRestaurantListByLocId = async () => {
//     try {
//       let url = `localhost:5000/restro/get-restaurant-list-by-loc-id/${selectLocation.location_id}`;
//       let response = await axios.get(url);
//       let data = response.data;
//       console.log(data);

//       setRestaurants(data.result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // call api on mounting
//   useEffect(() => {
//     getMealTypeList();
//     getLocationList();
//   }, []);

//   useEffect(() => {
//     if (selectLocation.location_id !== 0) {
//       getRestaurantListByLocId();
//       setHideRestaurant(false);
//     }
//   }, [getRestaurantListByLocId, selectLocation]);

//   return (
//     <div>
//       <div className="filterbox">
//         <Header />

//         <div className="top-header">
//           <div className="container">
//             <div className="logo-div">
//               <div className="biglogo  m-auto text-light d-flex justify-content-center align-items-center display-1 fw-bold">
//                 CampusBites
//               </div>
//             </div>
//           </div>
//           <div className="container">
//             <h1 className="text-light mt-3 text-center findtext">
//               Order in campus flavor with our mini Swiggy!
//             </h1>
//             <div className="row w-75  m-auto g-3 cus-w">
//               <div className="col-md-4">
//                 {/* <select className="form-select form-select p-3 rounded-0 text-body-tertiary ps-4 default-form"
//                                 aria-label="Default select example">

//                                 <option selected> Please type a location</option>
//                               {
//                                 location.map((locat)=>{
//                                     return( <option value={locat.location_id}>{locat.name} {locat.city}</option>
//                                     )
//                                 })
//                               }  
                              
//                             </select> */}
//                             <div className="position-relative">
//                             <input
//                               className="form-control "
//                               readOnly
//                               onClick={() => setHideLocation(false)}
//                               type="text"
//                               value={
//                                 selectLocation.name === ""
//                                   ? "Please select a location"
//                                   : selectLocation.name + "," + selectLocation.city
//                               }
//                               placeholder="Select a Location"
//                             />
          
//                             {hideLocation ? null : (
//                               <ul className="list-group position-absolute w-100">
//                                 {LocationState &&
//                                   LocationState.map((location, index) => {
//                                     return (
//                                       <li
//                                         key={location._id}
//                                         onClick={() => { getRestByLoc(location?._id) }}
//                                         className="list-group-item"
//                                       >
//                                         {location?.name}, {location?.city}
//                                       </li>
//                                     );
//                                   })}
//                               </ul>
//                             )}
//                           </div>
//                         </div>
//                         <div className="col-md-8">
//                           <span className="svg">
//                             <svg
//                               fill="rgba(33, 37, 41, 0.5)"
//                               strokeWidth="10"
//                               stroke="rgba(33, 37, 41, 0.5)"
//                               className="search-icon"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 512 512"
//                             >
//                               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
//                             </svg>
//                           </span>
//                           <div className="position-relative">
//                             <input
//                               className="form-control ps-5 pt-2"
//                               readOnly
//                               onClick={() => setHideRestaurant(false)}
//                               type="text"
//                               value={
//                                 selectRestaurant.name === ""
//                                   ? "Search for restaurants"
//                                   : restaurants.length +
//                                   " restaurants found" +
//                                   selectRestaurant.name +
//                                   "," +
//                                   selectRestaurant.city
//                               }
//                             />
          
//                             {hideRestaurant ? null : (
//                               <ul className="list-group position-absolute w-100">
//                                 {RestroState &&
//                                   RestroState.map((restaurant, index) => {
//                                     // eslint-disable-next-line jsx-a11y/alt-text
//                                     return (
//                                       <li
//                                         key={restaurant._id}
//                                         onClick={() =>
//                                           navigate(
//                                             "/restaurant-details/" + restaurant._id
//                                           )
//                                         }
//                                         className="list-group-item"
//                                       >
//                                         <img
//                                           className="rounded-circle me-3"
//                                           style={{ width: "60px", height: "60px" }}
//                                           src={`/images/${restaurant.image}`}
//                                           alt="Restrurant_img"
//                                         />
//                                         {restaurant.name}, {restaurant.city}
//                                       </li>
//                                     );
//                                   })}
//                               </ul>
//                             )}
//                           </div>
//                           {/* <select
//                                               className="form-select form-select p-3 rounded-0  text-body-tertiary ps-4 default-form default-form2"
//                                               aria-label="Default select example">
//                                               <option> Search for restaurents</option>
//                                               <option value="The Bill Chill Cakery">img The Bill Chill Cakery</option>
//                                               <option value="Punjabi Rasaoi">Punjabi Rasaoi</option>
//                                               <option value="Punjabi Rasaoi">Punjabi Rasaoi</option>
//                                           </select> */}
//                         </div>
//                       </div>
//                     </div>
//                     <br />
//                     <br />
//                   </div>
//                 </div>
//                 {/*End of filterbix*/}
//                 <main>
//                   <div className="main-container">
//                     <div className="container text-light">
//                       <div className="heading mt-5">
//                         <h1 className="text-edu text-light">Quick Searches</h1>
//                       </div>
//                     </div>
//                     <div className="container mt-4">
//                       <div className="row">
//                         {/* <!--start of col--> */}
//                         {meals &&
//                           meals.map((meal, index) => {
//                             return (
//                               <div
//                                 key={index}
//                                 onClick={() =>
//                                   navigate(`/search/${meal.meal_type}/${meal.name}`)
//                                 }
//                                 className="col-12 col-md-6 col-lg-6 col-xl-4 mt-4"
//                               >
//                                 <div className="card mb-3  rounded-0 p-0 border-0 cus-card">
//                                   <div className="row g-0">
//                                     <div className="col-5 col-md-5 col-sm-5">
//                                       <img
//                                         src={"/images/" + meal.image}
//                                         className="img-fluid "
//                                         alt="..."
//                                       />
//                                     </div>
//                                     <div className="col-7 col-md-7 col-sm-7">
//                                       <div className="card-body px-3 pb-0">
//                                         <h5 className="card-title text-dark fw-bold mt-2">
//                                           {meal.name}
//                                         </h5>
//                                         <p className="text-body-secondary">
//                                           {meal.content}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         {/* <!--end of col--> */}
//                       </div>
//                     </div>
//                   </div>
//                 </main>
//                 <Footer></Footer>
//               </div>
//             );
//           };
          
//           export default Home;
// */          