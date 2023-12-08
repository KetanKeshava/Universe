import User from "../models/userModel.js";

const findUserDetailsById = async (idValue) => {
    return await User.findOne({ _id: idValue }).select("-password").select("-updatedAt");
}

const findUserDetailsByUsername = async(usernameValue) => {
    return await User.findOne({ username: usernameValue }).select("-password").select("-updatedAt");
}

const findUserByEmailOrUsername = async(email, username) => {
    return await User.findOne({ $or: [{ email }, { username }] });
}

const saveUser = async(user) => {
    return await user.save();
}

const findUserByUsername = async(username) => {
    return await User.findOne({ username });
}

const findUserById = async(id) => {
    return await User.findById(id);
}

const findFollowingUsersById = async(id) => {
    return await User.findById(id).select("following");
}

const updateUsersForUnfollow = async(followUnFollowUserId, currentUserId) => {
    await User.findByIdAndUpdate(followUnFollowUserId, { $pull: { followers: currentUserId } });
	await User.findByIdAndUpdate(currentUserId, { $pull: { following: followUnFollowUserId } });
}

const updateUsersForFollow = async(followUnFollowUserId, currentUserId) => {
    await User.findByIdAndUpdate(followUnFollowUserId, { $push: { followers: currentUserId } });
	await User.findByIdAndUpdate(currentUserId, { $push: { following: followUnFollowUserId } });		
}

const getAllLimitedUserExceptId = async(userId, limit) => {
    return await User.aggregate([
        {
            $match: {
                _id: { $ne: userId },
            },
        },
        {
            $sample: { size: limit },
        },
    ]);
}

const findAllUsers = async () => {
    return await User.find().select("-password")
}

export {
    findUserDetailsById,
    findUserDetailsByUsername,
    findUserByEmailOrUsername,
    saveUser,
    findUserByUsername,
    findUserById,
    updateUsersForUnfollow,
    updateUsersForFollow,
    findFollowingUsersById,
    getAllLimitedUserExceptId,
    findAllUsers
}