import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import {useEffect} from 'react';

export default function LoginCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
	};

	const testRegex = (pattern, str) => {
		return pattern.test(str)
	}

	const [backgroundImage, setBackgroundImage] = useState("");

	useEffect(() => {
	const fetchBackgroundImage = async () => {
		try {
		const response = await fetch("https://source.unsplash.com/1600x900/?universe");
		setBackgroundImage(response.url);
		} catch (error) {
		console.error("Error fetching background image", error);
		}
	};

	fetchBackgroundImage();
	}, []);

	return (
		<Flex
			align={"center"}
			justify={"center"}
			bgImage={`url(${backgroundImage})`}
			bgSize="cover"
			bgPosition="center"
			minH={"100vh"}
		>
		<Flex align={"center"} justify={"center"}>
		<Stack
			spacing={8}
			mx={"auto"}
			maxW={{ base: "full", sm: "400px", md: "600px", lg: "800px" }}
			py={12}
			px={6}
		>
				{/* <Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Login
					</Heading>
				</Stack> */}
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.dark")}
					boxShadow={"lg"}
					p={8}
					w={{ base: "full", sm: "400px" }} 
				>
					<Stack align={"center"}>
					<Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} textAlign={"center"}>
						Login
					</Heading>
				</Stack>
				<br></br>
					<Stack spacing={4}>
						<FormControl isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								value={inputs.username}
								onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
							/>
							
							<Text color="red" fontSize="sm">
								{inputs.username !== "" ? testRegex(/^[a-zA-Z0-9]{4,20}$/, inputs.username) ? "" : "The username must be 4 to 20 characters long. It can only contain letters (both uppercase and lowercase) and numbers. Special characters and spaces are not allowed." : ""}
							</Text>		
							
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									value={inputs.password}
									onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>

							<Text color="red" fontSize="sm">
								{inputs.password !== "" ? testRegex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, inputs.password) ? "" : "The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It must be at least 8 characters long. Special characters include symbols such as !, @, #, $, etc." : ""}
							</Text>

						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Logging in'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleLogin}
								isLoading={loading}
							>
								Login
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Don&apos;t have an account?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
									Sign up
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
		</Flex>
	);
}
