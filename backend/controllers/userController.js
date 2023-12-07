import { fetchAllUsers, fetchSuggestedUsers, findUserDetailsFromQuery, followOrUnfollowUser, freezeOrUnfreezeUserById, freezeUserById, signInUser, updateUserProfile, userLoginAuth } from "../services/userService.js";

const getUserProfile = async (req, res) => {
	// fetch user profile either with username or userId
	// query is either username or userId
	const { query } = req.params;
	try {
		let user = await findUserDetailsFromQuery(query);
		res.status(200).json(user);
	} catch (err) {
		console.log("Error in getUserProfile: ", err.message);
		if (err.name == "UserNotFoundError") {
			return res.status(404).json({ error: err.message });
		}
		return res.status(500).json({ error: err.message });
	}
};

const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const newUserDetails = await signInUser(name, email, username, password, res);
		// generateTokenAndSetCookie(newUserDetails._id, res);
		return res.status(201).json(newUserDetails);
	} catch (err) {
		console.log("Error in signupUser: ", err.message);
		if (err.name == "UserAlreadyExistsError" || err.name == "InvalidUserError") {
			return res.status(400).json({ error: err.message })
		}
		return res.status(500).json({ error: err.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const userDetails = await userLoginAuth(username, password, res);
		// console.log(userDetails._id)
		// generateTokenAndSetCookie(userDetails._id, res);
		res.status(200).json(userDetails);
	} catch (error) {
		console.log("Error in loginUser: ", error.message);
		if (error.name == "InvalidUserError" || error.name == "UserAccountFrozenError") {
			return res.status(400).json({ error: error.message });
		}
		return res.status(500).json({ error: error.message });
		
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const followUnFollowUser = async (req, res) => {
	try {
		const followUnFollowUserId  = req.params.id;
		const currentUserId = req.user._id;
		const userMessage = await followOrUnfollowUser(followUnFollowUserId, currentUserId);
		return res.status(200).json({message : userMessage});
	} catch (err) {
		console.log("Error in followUnFollowUser: ", err.message);
		if (err.name == "InvalidUserError" || err.name == "UserDoesNotExist") {
			res.status(400).json({ error: err.message });
		}
		return res.status(500).json({ error: err.message });
	}
};

const updateUser = async (req, res) => {
	const { name, email, username, password, bio } = req.body;
	let { profilePic } = req.body;
	const userId = req.user._id;
	try {
		let user = await updateUserProfile(userId, req.params.id, name, email, username, password, bio, profilePic)
		return res.status(200).json(user);
	} catch (err) {
		console.log("Error in updateUser: ", err.message);
		return res.status(500).json({ error: err.message });
	}
};

const getSuggestedUsers = async (req, res) => {
	try {
		// exclude the current user from suggested users array and exclude users that current user is already following
		const userId = req.user._id;
		const suggestedUsers = await fetchSuggestedUsers(userId);
		res.status(200).json(suggestedUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const freezeAccount = async (req, res) => {
	try {
		const id = req.user._id;
		await freezeUserById(id);
		res.status(200).json({ success: true });
	} catch (error) {
		if (error.name == "UserNotFoundError") {
			res.status(400).json({ error: error.message });
		}
		return res.status(500).json({ error: error.message });
	}
};

const freezeUserAccount = async (req, res) => {
	try {
		const id = req.params.id;
		await freezeOrUnfreezeUserById(id)
		res.status(200).json({ success: true });
	} catch (error) {
		if (error.name == "UserNotFoundError") {
			res.status(400).json({ error: error.message });
		}
		return res.status(500).json({ error: error.message });
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await fetchAllUsers()
		return res.json(users)
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export {
	signupUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getUserProfile,
	getSuggestedUsers,
	freezeAccount,
	freezeUserAccount,
	getAllUsers,
};
