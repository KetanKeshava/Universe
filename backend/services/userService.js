import { findAllUsers, findFollowingUsersById, findUserByEmailOrUsername, findUserById, findUserByUsername, findUserDetailsById, findUserDetailsByUsername, getAllLimitedUserExceptId, saveUser, updateUsersForFollow, updateUsersForUnfollow } from "../db/userRepository.js";
import mongoose from "mongoose";
import { InvalidUserError, UserAccountFrozenError, UserAlreadyExistsError, UserNotFoundError } from "../errors/userErrors.js";
import User from "../models/userModel.js";
import { generateHash, isPasswordValid } from "./hashService.js";
import generateTokenAndSetCookie from "./authJwtService.js";
import { v2 as cloudinary } from "cloudinary";
import { updatePostwithUserReplies } from "../db/postRepository.js";
import { validateEmailField, validateNameField, validatePasswordField, validateUsernameField } from "./validation.js";

const findUserDetailsFromQuery = async(query) => {
    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
        user = await findUserDetailsById(query);
    } else {
        // query is username
        validateUsernameField(query);
        user = await findUserDetailsByUsername(query);
    }
    
    if (!user) {
        throw new UserNotFoundError();
    }
    return user;
}

const signInUser = async(name, email, username, password, res) => {
    const user = await findUserByEmailOrUsername(email, username);

    validateNameField(name)
    validateUsernameField(username)
    validateEmailField(email)
    validatePasswordField(password)

    if (user) {
        throw new UserAlreadyExistsError();
    }
    const hashedPassword = await generateHash(password);

    const newUser = new User({
        name,
        email,
        username,
        password: hashedPassword,
    });
    await saveUser(newUser);

    if (newUser) {
        // generateTokenAndSetCookie(newUser._id, res);
        return {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
            bio: newUser.bio,
            profilePic: newUser.profilePic,
            isFrozen: newUser.isFrozen,
            isAdmin: newUser.isAdmin,
        }
    } else {
        throw new InvalidUserError("Invalid User Data");
    }

}

const userLoginAuth = async (username, password, res) => {
    validateUsernameField(username)
    validatePasswordField(password)

    const user = await findUserByUsername(username);
    const hashedPassword = user?.password;
    const isPasswordCorrect = await isPasswordValid(password, hashedPassword);

    if (!user || !isPasswordCorrect) {
        throw new InvalidUserError("Invalid User Credentials");
    }

    if (user.isFrozen) {
        throw new UserAccountFrozenError();
    }

    generateTokenAndSetCookie(user._id, res);

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
        isFrozen: user.isFrozen,
        isAdmin: user.isAdmin,
    }
}

const freezeUserById = async(id) => {
    const user = await findUserById(id);
    if (!user) {
        throw new UserNotFoundError();
    }
    user.isFrozen = true;
    await saveUser(user);
}

const freezeOrUnfreezeUserById = async(id) => {
    const user = await findUserById(id);
    if (!user) {
        throw new UserNotFoundError();
    }
    const freezeState = !user.isFrozen;
    user.isFrozen = freezeState;
    await saveUser(user);
    return freezeState;
}

const fetchSuggestedUsers = async(userId) => {
    const usersFollowedByYou = await findFollowingUsersById(userId);

    const users = await getAllLimitedUserExceptId(userId, 10); 
    const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    return suggestedUsers;
}

const followOrUnfollowUser = async(followUnFollowUserId, currentUserId) => {

    if (followUnFollowUserId === currentUserId.toString()) {
        throw new InvalidUserError("Cannot follow or unfollow User")
    }

    const userToModify = await findUserById(followUnFollowUserId);
    const currentUser = await findUserById(currentUserId);
    
    if (!userToModify || !currentUser) {
        throw new UserNotFoundError();
    }

    const isFollowing = currentUser.following.includes(followUnFollowUserId);

    if (isFollowing) {
        // Unfollow user
        updateUsersForUnfollow(followUnFollowUserId, currentUserId);
        return "User unfollowed successfully";
    } else {
        // Follow user
        updateUsersForFollow(followUnFollowUserId, currentUserId);
        return "User followed successfully";
    }

}

const updateUserProfile = async (userId, reqId, name, email, username, password, bio, profilePic) => {
    if (name) {
        validateNameField(name)
    }
    if (username) {
        validateUsernameField(username)
    }
    if (email) {
        validateEmailField(email)
    } 
    if (password) {
        validatePasswordField(password)
    }
    let user = await findUserById(userId);
    if (!user) {
        throw new UserNotFoundError();
    }
    if (reqId !== userId.toString()) {
        throw new InvalidUserError("Cannot update other user's profile")
    }
    if (password) {
        user.password = await generateHash(password);
    }
    if (profilePic) {
        if (user.profilePic) {
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
        }

        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await saveUser(user);

    // Find all posts that this user replied and update username and userProfilePic fields
    await updatePostwithUserReplies(userId, user.username, user.profilePic);

    // password should be null in response
    user.password = null;

    return user;
}

const fetchAllUsers = async() => {
    return await findAllUsers()
}

export {
    findUserDetailsFromQuery,
    signInUser,
    userLoginAuth,
    freezeUserById,
    fetchSuggestedUsers,
    followOrUnfollowUser,
    updateUserProfile,
    freezeOrUnfreezeUserById,
    fetchAllUsers,
}