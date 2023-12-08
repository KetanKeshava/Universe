import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const AdminAnalyticsPage = () => {
    const [allUsers, setAllUsers] = useState([]);
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		// getFeedPosts();
        const getAllUsers = async () => {
            setLoading(true);
            setAllUsers([]);
            try{
                const res = await fetch("/api/users/getAll");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return
                }
                console.log("getAllUsers : ", data);
                setAllUsers(data);
            } catch (error) {
                showToast('Error', error.message, "error");
            } finally {
                setLoading(false);
            }
        }
        getAllUsers();
	}, [showToast, setAllUsers]);

    const toggleFreeze = (user) => {
        //call api to toggle freeze with user._id
    }

	return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box
				flex={35}
				display={{
					base: "none",
					md: "block",
				}}
			>
				{allUsers.map((user) => (
                    <div key={user._id}>
                        <button
                            style={{ backgroundColor: user.isFrozen ? '#ff0000' : '#00ff00' }}
                            onClick={() => toggleFreeze(user)}
                        >
                            {user._id}
                        </button>
                    </div>
                ))}

			</Box>
		</Flex>
	);
};

export default AdminAnalyticsPage;
