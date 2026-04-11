import { Cart } from '../model/userCartModel.js';

// get cart
export const getCart = async(req, res) => {
    try{
        const cart = await Cart.findOne({user: user._id});
        return res.render({cart, user: req.user})
    }catch(error){
        console.log(error)
    }
}

// add to cart
export const addToCart = async (req, res) => {
    const {productId, name, price, image} = req.body;
    try {
        let cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            cart = new Cart({user: req.user._id, items:[]});
        }
        const exsistingItem = cart.Item.find(item => item.productId === Number(productId));
        if(exsistingItem){
            exsistingItem.quantity+1;
        }else{
            cart.item.push({productId, name, price, image})
        }
        await cart.save();
        res.render('/cart');
    } catch (error) {
        console.log(error);
    }
}