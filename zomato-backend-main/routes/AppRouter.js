const AppRouter = require("express").Router();
const UserController =  require("../controller/UserController");
const LocationController = require("../controller/LocationController");
const RestaurantController=require("../controller/RestaurantController");
const MealTypeController = require("../controller/MealTypeController");
const CuisineController=require("../controller/CuisineController");
const PaymentController = require("../controller/PaymentController");

//get methods
AppRouter.get('/',UserController.userHomePage);
AppRouter.get('/get-users-list/:gender',UserController.getUserList);
// --AppRouter.get('/get-location-list',LocationController.getLocationList);
//-- AppRouter.get('/get-restaurant-list-by-loc-id/:id',RestaurantController.getRestaurantListByLocation);
// --AppRouter.get('/get-meal-type-list',MealTypeController.getMealTypeList);
// -- AppRouter.get('/get-restaurant-detail/:rest_id',RestaurantController.getSingleRestaurantDetails);
// AppRouter.get('/get-menu-item-list/:r_id',RestaurantController.getMenuItems);
// --AppRouter.get('/get-cuisine-list/',CuisineController.getCuisineList);

//post methods
//-- AppRouter.post('/addLocation',LocationController.createLocation);
AppRouter.post('/save-user-data',UserController.saveUserData);
AppRouter.post('/login',UserController.userLogin);
// --AppRouter.post('/filter',RestaurantController.filter);
//AppRouter.post("/filters", RestaurantController.getFilters);

AppRouter.post("/create-order", PaymentController.createOrder);
AppRouter.post("/verify-payment", PaymentController.verifyPayment);

module.exports=AppRouter;