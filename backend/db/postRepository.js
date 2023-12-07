import Post from "../models/postModel.js";

const updatePostwithUserReplies = async (userId, username, userprofilepic) => {
    await Post.updateMany(
        { "replies.userId": userId },
        {
            $set: {
                "replies.$[reply].username": username,
                "replies.$[reply].userProfilePic": userprofilepic,
            },
        },
        { arrayFilters: [{ "reply.userId": userId }] }
    );
}

export {
    updatePostwithUserReplies,
}