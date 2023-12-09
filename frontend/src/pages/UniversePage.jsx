import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { Image, ChakraProvider, Container, Flex, Box, Heading, Button, Link, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, CSSReset } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai'; 
import authScreenAtom from "../atoms/authAtom";

function UniversePage({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
	const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <ChakraProvider>
      <CSSReset />
      <Container maxW='100%' py={5} bg='red.600'>
        <Flex align="center">
          <Box flex="6">
            <Image src="favicon.png" alt="Husky" w="1000px" h="auto" />
          </Box>

          <Box flex="8">
            <Heading as="h1" size="xl" textAlign="center" mb={2}>
              Join Husky Community Today
            </Heading>
            <Heading as="h2" size="lg" textAlign="center" mb={4} color="black">
              Know What's Happening Now!
            </Heading>
            <hr />
            <Flex direction="column" align="center" mt={4}>
              {user && (
                <Link as={RouterLink} to='/'>
                  <AiFillHome size={24} />
                </Link>
              )}
              {!user && (
                <Button as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")} colorScheme="blue" variant="outline" borderRadius='20px' mb={2} color='black'>
                  Create an account
                </Button>
              )}
              <Text textAlign="left" mt={2}>
                By signing up, you agree to the <Link color="white" onClick={onOpen}>Terms of Service</Link> and{' '}
                <Link color="white" onClick={onOpen}>Privacy Policy</Link>, including Cookie Use.
              </Text>
              <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Terms of Service</DrawerHeader>
                    <DrawerBody>
                      {/* Your terms of service content */}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Privacy Policy</DrawerHeader>
                    <DrawerBody>
                      {/* Your privacy policy content */}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Text textAlign="center" mt={4}>Already have an account?</Text>
              <Button as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")} colorScheme="blue" variant="outline" mb={4} borderRadius='20px' color='black'>
                Sign In
              </Button>
            </Flex>
          </Box>
          <Box flex="1">
            {/* Your carousel component goes here */}
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default UniversePage;
