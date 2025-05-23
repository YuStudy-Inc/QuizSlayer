import schemas from '../schemas/Schemas.js';
import bcrypt from 'bcryptjs'
import s3 from '../config/s3.js';
import aws from 'aws-sdk'
import dotenv from 'dotenv'

import { validEmail, validPassword } from "../utils/validators.js";

const User = schemas.User

const hashPassword = ((password) => {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
})

const passwordMatch = (async(passwordFromUser, savedPasswordFromDB) => {
    return await bcrypt.compare(passwordFromUser, savedPasswordFromDB)
})

// const changeActiveStatus = (async (user) => {
//     const active = user.isOnline;
//     return await User.findOneAndUpdate({ username: user.username }, { isOnline: !active })
// })
export const getUser = async(req, res) => {
    try {
        const userId = req.session.userID;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // console.log(user);
        return res.status(200).json({ 
            message: "User found",
            user: user
         });

    }
    catch (e){
        console.error("Error getting user: ", e)
        res.status(500).json({"message": "Error getting user", "e": e})
    }
}

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
            isOneline: true, //got rid of pfp so it uses the default values
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

        req.session.userID = newUser._id;

        res.status(201).json({
            "message": "new user created",
            "headers": {'Set-Cookie': req.headers.cookie || ''},
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
        const {email, password} = req.body
        console.log("Here!")
        const user = await User.findOne( {email: email} )
        if (!user)
            return res.status(404).json({ message: "User not found" })
        
        const passwordValidated = await passwordMatch(password, user.password) 
        if (!passwordValidated)
            return res.status(400).json({ message: "Invalid Password" })
        
        // await changeActiveStatus(user)

        req.session.userID = user._id;

        return res.status(200).json({
            "message": "Login Successful",
            "headers": {'Set-Cookie': res.cookie || ''},
            "user": user
        })
    } 
    catch (e) {
        console.error("error logging in: ", e)
        return res.status(500).json({"message": "Error logging in", "e": e})
    }
}

export const editUser = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId});
        //need to check if username is taken. 
        if (req.body.username) {
            const tempUser = await User.findOne({ username: req.body.username });
            if (tempUser && tempUser._id.toString() !== user._id.toString()) {
                return res.status(409).json({ error: 'Username taken' });
            }
        }
        //Only changes the parameter that was included in the json req
        const result = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { new: true } // returns updated user object
          );
        console.log(result);

        // res.status(200).json({updatedCount: result.modifiedCount}) 
        res.status(200).json({message: 'User updated! ', user: result}) 
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

export const generatePreSignedURLForThePFPBecauseTheBucketIsPublicAndIDontWantThoseHackersAbusingTheBucketThroughIdkWhatButIReallyDontWantAWSToChargeMe = async (req, res) => {
    const { filename, fileType } = req.body
    const userId = req.params.id;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const allowedExtensions = /\.(jpe?g|png)$/i;

    if (!allowedTypes.includes(fileType) || !allowedExtensions.test(fileName)) {
        return res.status(400).json({ error: 'Invalid file type. Only JPG and PNG are allowed.' });
    }

    const key = `users/${userId}/${Date.now()}-${filename}`

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Expires: 60,
        contentType: fileType,
        ACL: 'public-read'
    }

    try {
        const uploadURL = await s3.getSignedUrlPromise('putObject', params)
        res.status(200).json({uploadURL, key})
    }
    catch (e) {
        console.error("error generating the presigned URL", e)
        res.status(500).json({error: "could not generate presigned URL"})
    }
}

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
        const user = await User.findOne({_id: userId }).populate("friendsList");
        // const friends = user.friendsList.filter(friend => friend.isOnline === true);
        console.log(user.friendsList.length)
        console.log("Current date: " + Date.now());
        // user.friendsList.filter(friend => console.log(friend.lastSeen + " < " + (Date.now() - 1000 * 60 * 2)));

        const friends = user.friendsList.filter(friend => friend.lastSeen > Date.now() - 1000 * 60 * 2); // Check if friend was online less than 2 min ago

        res.status(200).json({friends})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving active friends'})
        console.log(e)
    }
}

export const getFriends = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findOne({_id: userId }).populate({
            path: "friendsList",
            select: "pfp username description selectedCharacter selectedHat selectedWeapon monstersSlain"
        });
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

export const addCharacterToList = async (req, res) => {
    try {
        const userId = req.params.id
        const itemWon = req.body.character
    
        const user = await User.findById(userId).select("characterList")
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }

        if (user.characterList.includes(itemWon)) {
            res.status(403).json({ message: "user already has this item" })
            return;
        }
        user.characterList.push(itemWon)
        await user.save()

        res.status(200).json({ characterList: user.characterList })
    }
    catch (e) {
        res.status(500).json({ error: "Error updating character list" });
        console.log(e);
    }
}

export const addItemToInventory = async (req, res) => {
    try {
        const userId = req.params.id
        const itemWon = req.body.item
    
        const user = await User.findById(userId).select("inventory")
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }
        console.log(user.inventory)

        if (user.inventory.includes(itemWon)) {
            res.status(403).json({ message: "user already has this item" })
            return;
        }

        user.inventory.push(itemWon)
        await user.save()

        res.status(200).json({ inventory: user.inventory })
            
    }
    catch (e) {
        res.status(500).json({ error: "Error updating character list" });
        console.log(e);
    }
}





export const updateSelections = async (req, res) => {
    try {
        const userId = req.session.userID;
        const { selectedCharacter, selectedHat, selectedWeapon } = req.body;

        const updateFields = {};
        if (selectedCharacter !== undefined) updateFields.selectedCharacter = selectedCharacter;
        if (selectedHat !== undefined) updateFields.selectedHat = selectedHat;
        if (selectedWeapon !== undefined) updateFields.selectedWeapon = selectedWeapon;

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updateFields },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ 
            message: "Selections updated successfully",
            headers: {'Set-Cookie': req.headers.cookie || ''},
            user: user
         });
    } catch (e) {
        res.status(500).json({ error: "Error updating selections" });
        console.log(e);
    }
};

export const getTop10 = async (req, res) => {
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

        const friends = await Promise.all(
            friendRequests.map(friendId => User.findById(friendId).select("username pfp _id"))
        )

        res.status(200).json({friendRequests: friends})
    } catch (e) {
        res.status(500).json({error: 'Error retreiving friends requests'})
        console.log(e)
    }
}

export const getAICreations = async(req,res) => {
    try{
        const userId = req.session.userID
        const user = await User.findOne({_id: userId})
        const aiCreations = user.xp
        return res.status(200).json({AICreations: aiCreations})
    } catch(e) {
        console.log(e);
        return res.status(500).json({error: 'Error retreiving friends requests'})
    }
}

export const increaseAICreations = async(req, res) => {
    try {
        const userId = req.session.userID
        const user = await User.findOne({_id: userId})
        user.xp = user.xp++
        user.save();
        return res.status(200).json({message: 'AICreations increased'})
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: 'Error increase AICreations'})
    }
}

export const acceptFriendRequest = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        const otherUser = req.body.friendId;
        const acceptingUser = await User.findById(otherUser);
        if (!user || !acceptingUser){
            res.status(404).json({ message: "User not found" })
            return;
        }

        if (user.friendsList.includes(otherUser)) {
            res.status(400).json({ message: "Already friends with them" })
            return;
        }

        user.friendsList.push(acceptingUser._id)
        //idk if this will work with pop
        user.friendRequests.pull(acceptingUser._id)
        user.save()
        acceptingUser.friendsList.push(user._id);
        acceptingUser.save();
        res.status(200).json({message: 'Friend request accepted!'})
    } catch (e) {
        res.status(500).json({error: 'Error accepting friend request'})
        console.log(e)
    }
}

export const rejectFriendRequest = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        const otherUser = req.body.friendId;
        const rejectingUser = await User.findById(otherUser);
        if (!user || !rejectingUser){
            res.status(404).json({ message: "User not found" })
            return;
        }

        if (user.friendsList.includes(otherUser)) {
            res.status(400).json({ message: "Already friends with them" })
            return;
        }

        if (!user.friendRequests.includes(otherUser)) {
            return res.status(400).json({ message: "No such friend request exists" });
        }

        user.friendRequests.pull(rejectingUser._id);
        await user.save()
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
        const requestUsername = req.body.username;
        const requestUser = await User.findOne({username: requestUsername});
        if (!user || !requestUser){
            res.status(404).json({ message: "User not found" })
            return;
        }
        if (user.username === req.body.username) {
            res.status(400).json({error: 'Cannot send friend request to yourself'})
            return;
        }
    
        if (user.friendsList.includes(requestUser._id)) {
            res.status(400).json({error: 'Friend already exists'})
            return;
        }

        if (requestUser.friendRequests.includes(user._id)) {
            res.status(400).json({error: 'Friend request already sent'})
            return;
        }
        requestUser.friendRequests.push(user._id);
        await requestUser.save();
        res.status(200).json({message: 'Friend request sent!'})
    } catch (e) {
        res.status(500).json({error: 'Error sending friend request'})
        console.log(e)
    }
}

export const getUsersCoins = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId).select("coins")
        
        if (!user) {
            res.status(404).json({error: "user doesn't exist"})
            return
        }
        res.status(200).json({coins: user.coins})
    }
    catch (e) {
        res.status(500).json({error: "error fetching user's coins"})
    }
}   

export const updateUsersCoins = async (req, res) => {
    try {
        const userId = req.params.id
        const balance = req.body.coins

        const user = await User.findById(userId).select("coins")

        if (!user) {
            res.status(404).json({error: "user doesn't exist"})
            return
        }

        const adjust = user.coins + balance
        const updatedUsersCoins = await User.findByIdAndUpdate(userId, { coins : adjust }, { new: true }).select("coins")
        res.status(200).json({ coins: updatedUsersCoins.coins })
    }
    catch (e) {
        res.status(500).json({error: "error fetching user's coins"})
    }
}
export const updateUserMonstersSlain = async(req, res) =>{
    try{
        const userId = req.params.id;
        const monstersSlain = req.body.monstersSlain;
        const user = await User.findById(userId).select("monstersSlain");
        if (!user) {
            res.status(404).json({error: "user doesn't exist"})
            return
        }
        const adjust = user.monstersSlain + monstersSlain;
        const updatedUsers = await User.findByIdAndUpdate(userId, { monstersSlain : adjust }, { new: true }).select("monstersSlain")
        await updatedUsers.save();
        res.status(200).json({ monstersSlain: updatedUsers.monstersSlain })
    }
    catch(e){
        res.status(500).json({error: "error updating user's monsters slain"});
    }
}