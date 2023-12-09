import { Box, Flex, Spinner, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

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

  // Prepare data for the pie chart
  const frozenCount = allUsers.filter((user) => user.isFrozen).length;
  const activeCount = allUsers.length - frozenCount;

  const pieChartData = [
    { name: "Frozen", value: frozenCount },
    { name: "Active", value: activeCount },
  ];


  return (
    <Flex direction="column" gap={4} alignItems="stretch">
      {loading ? (
        <Spinner />
      ) : (
        <Flex>
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

                    <td style={{ backgroundColor: user.isFrozen ? "#ff0000" : "#39B54A" }}>
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
          </Box>
        </Flex>
      )}
      {/* Pie Chart */}
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" ml={4} mt={4}>
      <Box>
            <Text fontSize="lg" fontWeight="bold">Percentage of Frozen Accounts:</Text>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={pieChartData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#F1332E" : "#39B54A"} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">Stats:</Text>
            <Text>Total Users: {allUsers.length}</Text>
            <Text>Average Followers: {allUsers.reduce((sum, user) => sum + user.followers.length, 0) / allUsers.length}</Text>
            <Text>Average Following: {allUsers.reduce((sum, user) => sum + user.following.length, 0) / allUsers.length}</Text>
            {allUsers.length > 0 && (
              <Text>Platform's first User's Name: {allUsers[0].name}, <br></br> Username: {allUsers[0].username}, <br></br> Registered on: {allUsers[0].createdAt}</Text>
            )}
          </Box>
        </Flex>
      </Flex>
  );
};

export default AdminAnalyticsPage;
