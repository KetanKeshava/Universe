import { Box, Flex, Spinner, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const AdminAnalyticsPage = () => {
	const [allUsers, setAllUsers] = useState([]);
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
				return;
			}
			setAllUsers(data);
		} catch (error) {
			showToast('Error', error.message, "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
	getAllUsers();
	}, [showToast]);

  const toggleFreeze = async (user) => {
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
      } else {
        // If the update is successful, update the local user data
        setAllUsers((prevUsers) =>
          prevUsers.map((prevUser) =>
            prevUser._id === user._id ? { ...prevUser, isFrozen: !prevUser.isFrozen } : prevUser
          )
        );
      }
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex direction="column" gap={4} alignItems="stretch">
      {loading ? (
        <Spinner />
      ) : (
        <Box overflowX="auto">
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>UserName</th>
                <th>Followers</th>
                <th>Following</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
              </thead>
              <tbody>
              {allUsers.map((user) => (
                user.isAdmin === false && (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.followers.length}</td>
                    <td>{user.following.length}</td>

                    <td style={{ backgroundColor: user.isFrozen ? "#ff0000" : "#00ff00" }}>
                      {user.isFrozen ? "Frozen" : "Active"}
                    </td>
                    <td>
                    <Button onClick={() => toggleFreeze(user)}>
                    {user.isFrozen ? "Unfreeze" : "Freeze"}
                    </Button>
                    </td>
                    </tr>
                    )
                    ))}
            </tbody>
          </table>
        <br></br>
        <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">Stats:</Text>
            <Text>Total Users: {allUsers.length}</Text>
            <Text>Average Followers: {allUsers.reduce((sum, user) => sum + user.followers.length, 0) / allUsers.length}</Text>
            <Text>Average Following: {allUsers.reduce((sum, user) => sum + user.following.length, 0) / allUsers.length}</Text>
            <Text>Percentage of Frozen Accounts: {(allUsers.filter((user) => user.isFrozen).length / allUsers.length) * 100}%</Text>
            {allUsers.length > 0 && (
              <Text>Newest User's Name: {allUsers[0].name}, <br></br> Username: {allUsers[0].username}, <br></br> Registered on: {allUsers[0].createdAt}</Text>
            )}
          </Box>
        </Box>
      )}
      </Flex>
  );
};

export default AdminAnalyticsPage;
