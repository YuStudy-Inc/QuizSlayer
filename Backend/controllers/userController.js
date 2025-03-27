import schemas from '../schemas/Schemas.js';
import bcrypt from 'bcryptjs'
import { validEmail, validPassword } from "../utils/validators.js";
const User = schemas.User
const hashPassword = ((password) => {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
})

const passwordMatch = (async(passwordFromUser, savedPasswordFromDB) => {
    return await bcrypt.compare(passwordFromUser, savedPasswordFromDB)
})

export const createUser = async(req, res) => {
    try {
        const { username, email, password, passwordAgain } = req.body
        
        if (!username || !email || !password || !passwordAgain)
            return res.status(404).json({"message": "Not all information filled out"})
        
        const users = await User.find({}, "username")
        const listOfUsernames = new Set(users.map(user => user.username))
        console.log(listOfUsernames)
        if (listOfUsernames.has(username))
            return res.status(400).json({"message": "Username already exists"})

        if (!validEmail(email))
            return res.status(400).json({"message": "This is not a valid email"})

        if (!validPassword(password))
            return res.status(400).json({"message": "The password is weak"})

        if (password !== passwordAgain)
            return res.status(400).json({"message": "The passwords do not match"})

        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            pfp: "", //pfp string url, save a temp one for now after creation
            description: "", //description, empty for now (could default to "" in the schema)
            inventory: [], //we need to store at least one character in the inventory list
            //[], //or can we have another list for characters ?
            selectedCharacter: 1, //selected character will be the first one
            xp: 0, //xp
            coins: 0 //coins
        })
        await newUser.save()
        res.status(201).json({
            "message": "new user created",
            "user": newUser
        })
    }
    catch (e) {
        console.error("error creating user: ", e)
        res.status(500).json({"message": "Error creating user", "e": e})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body
        console.log("Here!")
        const user = await User.findOne( {username} )
        if (!user)
            res.status(404).json({ message: "User not found" })
        
        const passwordValidated = await passwordMatch(password, user.password) 
        if (!passwordValidated)
            res.status(400).json({ message: "Invalid Password" })
        
        res.status(200).json({
            "message": "Login Successful",
            "user": user
        })
    } 
    catch (e) {
        console.error("error logging in: ", e)
        res.status(500).json({"message": "Error logging in", "e": e})
    }
}

export const editUser = async (req,res) => {
    try {
        const userId = req.params.id
        
        //need to check if username is taken. 
        const tempUser = await User.findOne({username: req.body.username})
        if(tempUser){
            res.status(409).json({error: 'Username taken'})
            return; 
        }
        //Only changes the parameter that was included in the json req
        const result = await User.findOneAndUpdate({_id: userId}, {$set: req.body}).select("username email -_id");
        console.log(result);

        // res.status(200).json({updatedCount: result.modifiedCount}) 
        res.status(200).json({message: 'Username update: ', user: result}) 
    } catch (e) {
        res.status(500).json({error: 'User not modified'})
        console.log(e)
    }
}

export const editUserPassword = async (req,res) => {
    try {
        const {oldPassword, newPassword, newPasswordAgain} = req.body
        const user = await User.findOne({_id: req.params.id})
        if(newPassword != newPasswordAgain) {
            res.status(400).json({error: "New Passwords do not match!"})
            return;
        }
        if (!validPassword(newPassword)) {
            res.status(400).json({error: "The password is weak"})
            return;
        }
        const passwordValidated = await passwordMatch(oldPassword, user.password)
        if(!passwordValidated) {
            res.status(404).json({error: 'Old Password Incorrect'})
            return;
        }
        user.password = await hashPassword(newPassword);
        user.save();

        res.status(200).json({message: 'Password updated!'})
    }
    catch (e) {
        res.status(500).json({error: 'Password not modified'})
        console.log(e)
    } 
}

export const deleteUser = async(req, res)=>{
    const {id} = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            res.status(404).json({error: 'User not found'})
            return;
        }
        res.status(200).json({message: 'User deleted sucessfully!'})
    }
    catch(error){
        res.status(500).json({error: 'Error trying to delete User'})
        console.log(error);
    }
}


//need a getFriends from user id