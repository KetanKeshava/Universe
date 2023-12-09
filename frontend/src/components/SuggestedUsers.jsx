import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const SuggestedUsers = () => {
	const user = useRecoilValue(userAtom);
    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const showToast = useShowToast();
    useEffect(() => {
        const getSuggestedUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setSuggestedUsers(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getSuggestedUsers();
    }, [showToast]);
    return (
        <>
        {!user.isAdmin && (
                <>
            <Text mb={4} fontWeight={"bold"}>
                Suggested Users
            </Text>
            <Flex direction={"column"} gap={4}>
                {!loading && suggestedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}
                {loading &&
                    [0, 1, 2, 3, 4].map((_, idx) => (
                        <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                            {/* avatar skeleton */}
                            <Box>
                                <SkeletonCircle size={"10"} />
                            </Box>
                            {/* username and fullname skeleton */}
                            <Flex w={"full"} flexDirection={"column"} gap={2}>
                                <Skeleton h={"8px"} w={"80px"} />
                                <Skeleton h={"8px"} w={"90px"} />
                            </Flex>
                            {/* follow button skeleton */}
                            <Flex>
                                <Skeleton h={"20px"} w={"60px"} />
                            </Flex>
                        </Flex>
                    ))}
            </Flex>
            </>
            )}
            <br></br>
            <Text mb={4} fontWeight={"bold"}>
                Weather Today
            </Text>
            <iframe
        title="Weather App"
        src="https://inspiring-fairy-5e87ee.netlify.app/"
        width="100%"
        height="500px"
        frameBorder="0"
      />
        </>
    );
};
export default SuggestedUsers;
