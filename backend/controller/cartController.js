import Cart from '../model/userCartModel.js';

// get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    res.json('cart', { cart, user: req.user });
  } catch (error) {
    console.log(error)
    res.status(500).send('Failed to load cart');
  }
};

// add to cart
export const addToCart = async (req, res) => {
    const { productId, name, price, image } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId === Number(productId));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.items.push({ productId, name, price, image });
        }

        await cart.save();
        res.json({ message: 'Item added to cart', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
};

//update items in cart
export const updateCart = async (req, res) => {
    const {productId, quantity} = req.body;
    try {
        let cart = await Cart.findOne({user: req.user.userId});
        if(!cart) {return res.json('cart', {error: 'cart not found'})};
        const item = cart.items.find(item => item.productId === Number(productId));
        if(!item){return res.status(404).json({error: 'cart not found'});};
        item.quantity = Number(quantity);
        await cart.save();
        res.json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.log(error)
    }
}

//remove item from cart
export const removeFromCart = async (req, res) => {
    const {productId} = req.params;
    try {
        let cart = await Cart.findOne({user: req.user.userId});
        if(!cart) {return res.json('cart', {error: 'cart not found'})};
        cart.items = cart.items.filter(items => items.productId !== Number(productId));
        await cart.save();
        res.json({ message: 'item deleted successfully', cart });
    } catch (error) {
        console.log(error);
    }
}