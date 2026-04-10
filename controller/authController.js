import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import {User} from '../model/userModel.js'


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

        const token = jwt.sign(
            { id : user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1hour' } 
        )

        console.log(token);

        res.cookie('token', token, {
            httpOnly : true,
            secure: true,
        })



        res.status(201).json({
        success: true,
        message: "User created successfully"
})} catch (err) {
        console.log(err);
}}