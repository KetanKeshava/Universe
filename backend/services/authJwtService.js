import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPERIES_IN_STR,
	});

	res.cookie("jwt", token, {
		httpOnly: true, // more secure
		maxAge: process.env.JWT_EXPERIES_IN, // 15 days
		sameSite: "strict", // CSRF
	});

	return token;
};

export default generateTokenAndSetCookie;
