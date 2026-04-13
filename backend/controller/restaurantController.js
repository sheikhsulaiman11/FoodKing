import restrauntModel from '../model/restrauntModel.js';
import Restaurant from '../model/restrauntModel.js'

//get all restraunts
export const getAllRestaurants = async (req, res) => {
    try{
        const restaurant = await Restaurant.find()
        res.json(restaurant)
       
        } catch (error){
        console.log('Fetch error:', error.message);
        res.status(500).send('Failed to fetch restaurants');
    }
} 

//creat new restaurant
export const createRestaurant = async (req, res) => {
    try {
        const {name,location} = req.body;
        
        const restaurant = await restrauntModel.create(req.body);

        res.json(restaurant)
    }catch(e){
        console.log(e);
    }
}

//update restaurant details
export const updateRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
    try{
         const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body)
         res.json(restaurant)
    } catch (error){
        console.log(error)
    }
}


//delete restaurent
export const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
    try {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId)
        res.json('done');
    } catch (error) {
        console.log(error)
    }
}