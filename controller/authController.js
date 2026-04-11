import bcrypt from 'bcryptjs'
import {User} from '../model/userModel.js'
import { createJWT } from '../utils/generateToken&SetToken.js';


// Render login page
export const renderLogin = (req, res) => {
    res.render('login', { error: null });
};


// Render signup page
export const renderSignup = (req, res) => {
    res.render('signup', { error: null });
};




//signup user
export const signup = async (req, res) => {
    try{
    const {firstName, lastName, email, password} = req.body;
    if ( !firstName || !lastName || !email || !password){
        return res.json('signup', {error : "all fields are required"});
        }

        const exsisting = await User.findOne({email});

        if (exsisting){
            return res.json({error: "email already exsists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({firstName, lastName, email, password: hashedPassword});
        

        const data = { username: user.name, userId: user._id, role: user.role };
        createJWT(data, res);

        console.log(token);

        res.status(201).json({
        success: true,
        message: "User created successfully"
})} catch (err) {
        console.log(err);
}};


//user login
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email) return res.json('login', {error: 'email required'});

        const user = await User.findOne({email});

        if (!user) return res.json('login', {error: 'email not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json('login', {error: 'wrong password'})

         const data = { username: user.name, userId: user._id, role: user.role };
        createJWT(data, res);


        res.status(201).json({
        success: true,
        message: "User loggedIn successfully"
        })}  catch (error) {
        console.log(error);
    }
}