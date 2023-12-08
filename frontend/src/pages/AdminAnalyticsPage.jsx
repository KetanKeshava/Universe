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

	useEffect(() => { 
        getAllUsers();
	}, [showToast, setAllUsers]);

    const toggleFreeze = async (user) => {
        //call api to toggle freeze with user._id
		try{
			const res = await fetch(`/api/users/freezeAccount/${user._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			console.log(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally{
			getAllUsers();
		}	
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
			{loading ? (
			  <Spinner />
			) : (
			  <table>
				<thead>
				  <tr>
					<th>Name</th>
					<th>Status</th>
					<th>Action</th>
					{/* Add other table headers as needed */}
				  </tr>
				</thead>
				<tbody>
				  {allUsers.map((user) => (
					user.isAdmin === false && (
					  <tr key={user._id}>
						<td>{user.name}</td>
						<td style={{ backgroundColor: user.isFrozen ? '#ff0000' : '#00ff00' }}>
						  {user.isFrozen ? 'Frozen' : 'Active'}
						</td>
						{/* Add other table cells as needed */}
						<td>
						  <button onClick={() => toggleFreeze(user)}>
							{user.isFrozen ? 'Unfreeze' : 'Freeze'}
						  </button>
						</td>
					  </tr>
					)
				  ))}
				</tbody>
			  </table>
			)}
		  </Box>
		</Flex>
	);
};

export default AdminAnalyticsPage;
