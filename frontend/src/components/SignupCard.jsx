import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
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
import { useNavigate } from "react-router-dom";

export default function SignupCard() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const testRegex = (pattern, str) => {
		return pattern.test(str)
	}

	const handleSignup = async () => {
		try {
			const res = await fetch("/api/users/signup", {
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

			// localStorage.setItem("user-threads", JSON.stringify(data));
			// setUser(data);
			setAuthScreen("login")
			navigate("/auth");
		} catch (error) {
			showToast("Error", error, "error");
		}
	};

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
			minHeight="100vh"
		>
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8} w={{ base: "full", sm: "400px" }} >
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<br></br>
					<Stack spacing={8}>
						
						<FormControl isRequired>
							<FormLabel>Full name</FormLabel>
							<Input
								type='text'
								onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								value={inputs.name}
							/>
							<Text color="red" fontSize="sm">
								{inputs.name !== "" ? testRegex(/^([A-Za-z]+(?: [A-Za-z]+)*)$/, inputs.name) ? "" : "The input should only contain letters (A-Z, a-z) and spaces. Each word must start with a letter. Words can be separated by spaces. Numbers and special characters are not allowed." : ""}
							</Text>	
						</FormControl>
							
						<FormControl isRequired>
							<FormLabel>Username</FormLabel>
							<Input
								type='text'
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								value={inputs.username}
							/>
							<Text color="red" fontSize="sm">
								{inputs.username !== "" ? testRegex(/^[a-zA-Z0-9]{4,20}$/, inputs.username) ? "" : "The username must be 4 to 20 characters long. It can only contain letters (both uppercase and lowercase) and numbers. Special characters and spaces are not allowed." : ""}
							</Text>	
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								value={inputs.email}
							/>
							<Text color="red" fontSize="sm">
								{inputs.email !== "" ? testRegex(/^[A-Za-z0-9._%+-]+@northeastern\.edu$/, inputs.email) ? "" : "Please enter a valid Northeastern University email address. The email address must end with '@northeastern.edu'.Only letters (A-Z, a-z), numbers (0-9), and the following characters are allowed: . _ % + -" : ""}
							</Text>	
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
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
								loadingText='Submitting'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									Login
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
