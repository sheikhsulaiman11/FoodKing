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

//update items in cart
export const updateCart = async (req, res) => {
    const {productId, quantity} = req.body;
    try {
        let cart = await Cart.findOne({user: req.user._id});
        if(!cart) {return res.render('cart', {error: 'cart not found'})};
        const item = cart.item.findOne(item => item.productId === Number(productId));
        if(!item){return res.render('cart', {error: 'item not found'})};
        item.quantity = Number(quantity);
        await Cart.save();
        res.redirect('/cart');
    } catch (error) {
        console.log(error)
    }
}

//remove item from cart
export const removeFromCart = async (req, res) => {
    const {productId} = req.params;
    try {
        let cart = await Cart.findOne({user: req.user._id});
        if (!cart){return res.render('cart', {error: 'cart not found'})};
        cart.items = cart.items.filter(item => item.productId !== Number(productId));
        await cart.save();
        res.redirect('/cart');
    } catch (error) {
        console.log(error);
    }
}