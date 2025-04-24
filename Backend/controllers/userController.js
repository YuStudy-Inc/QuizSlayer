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

const changeActiveStatus = (async(user) => {
    const active = user.active;
    return await User.findOneAndUpdate({username: user.username}, {active: !active})
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
            isOneline: true,
            pfp: "", //pfp string url, save a temp one for now after creation
            description: "", //description, empty for now (could default to "" in the schema)
            friendsList: [],
            friendRequest: [],
            inventory: [], //we need to store at least one character in the inventory list
            //[], //or can we have another list for characters ?
            selectedCharacter: 1, //selected character will be the first one
            selectedHat: 0,
            selectedWeapon: 0,
            xp: 0, //xp
            coins: 0, //coins
            monstersSlain: 0,
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
        
        await changeActiveStatus(user)
        
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
        const result = await User.findOneAndUpdate({_id: userId}, {$set: req.body}).select("username description -_id");
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

//how we get pfp . Still need to research

export const getUsername = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        res.status(200).json({username: user.username})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving username'})
        console.log(e)
    }
}

export const getDescription = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        res.status(200).json({description: user.description})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving description'})
        console.log(e)
    }
}

export const getActiveFriends = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        const friends = user.friendsList.filter(friend => friend.isOnline === true)
        res.status(200).json({friends})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving active friends'})
        console.log(e)
    }
}

export const getFriends = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        const friends = user.friendsList
        res.status(200).json({friends})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving friends'})
        console.log(e)
    }
}

export const getCharacterList = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        const characterList = user.characterList
        res.status(200).json({characterList})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving character list'})
        console.log(e)
    }
}

export const getInventory = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        const inventory = user.inventory
        res.status(200).json({inventory})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving inventory'})
        console.log(e)
    }
}

export const getTop10 = async(req, res) => {
    try {
        const top10Players = await User.find().sort({monstersSlain: -1}).limit(10)
        res.status(200).json({top10Players})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving top 10'})
        console.log(e)
    }
}

export const getFriendRequests = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })
        const friendRequests = user.friendRequests
        res.status(200).json({friendRequests})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving friends requests'})
        console.log(e)
    }
}

export const acceptFriendRequest = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })

        if (!user) {
            user.friendRequest.pop(friendRequest)
            res.status(404).json({ message: "User not found" })
        }

        const usersIncomingFriend = await User.findOne({_id: req.body })
        user.friendsList.push(usersIncomingFriend)
        //idk if this will work with pop
        user.friendRequest.pop(usersIncomingFriend)
        user.save()
        res.status(200).json({message: 'Friend request accepted!'})
    } catch (e) {
        res.status(500).json({error: 'Error accepting friend request'})
        console.log(e)
    }
}

export const rejectFriendRequest = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })

        if (!user)
            res.status(404).json({ message: "User not found" })

        const usersIncomingFriend = await User.findOne({_id: req.body })
        //idk if this will work with pop
        user.friendRequest.pop(usersIncomingFriend)
        user.save()
        res.status(200).json({message: 'Friend request rejected!'})
    } catch (e) {
        res.status(500).json({error: 'Error rejecting friend request'})
        console.log(e)
    }
}

export const sendFriendRequest = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId })

        if (!user)
            res.status(404).json({ message: "User not found" })

        if (user.id === req.body.username) {
            res.status(400).json({error: 'Cannot send friend request to yourself'})
            return;
        }
    
        if (user.friendsList.includes(req.body.username)) {
            res.status(400).json({error: 'Friend already exists'})
            return;
        }

        if (user.friendRequests.includes(req.body.username)) {
            res.status(400).json({error: 'Friend request already sent'})
            return;
        }

        const sentFriendRequest = req.body
        user.friendRequests.push(sentFriendRequest)
        user.save()
        res.status(200).json({message: 'Friend request sent!'})
    } catch (e) {
        res.status(500).json({error: 'Error sending friend request'})
        console.log(e)
    }
}