import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { Image, ChakraProvider, Container, Flex, Box, Heading, Button, Link, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, CSSReset } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai'; 
import authScreenAtom from "../atoms/authAtom";

function UniversePage({ user }) {
  
  const [isOpenTos, setIsOpenTos] = React.useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = React.useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);

  const onCloseTos = () => setIsOpenTos(false);
  const onOpenTos = () => setIsOpenTos(true);
  const onClosePrivacy = () => setIsOpenPrivacy(false);
  const onOpenPrivacy = () => setIsOpenPrivacy(true);

  return (
    <ChakraProvider>
      <CSSReset />
      <Container maxW='100%' py={5} bg='red.600'>
        <Flex align="center">
          <Box flex="6">
            <Image src="favicon.png" alt="Husky" w="1000px" h="auto" />
          </Box>

          <Box flex="8">
            <Heading as="h1" size="4xl" textAlign="center" mb={2} color='black'>
              Uni-Verse
            </Heading>
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
                <Button as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")} colorScheme="blue" variant="outline" borderRadius='20px' mb={2} color='black' _hover={{ bg: 'white', color: 'black' }}>
                  Create an account
                </Button>
              )}
              <Text textAlign="left" mt={2}>
                By signing up, you agree to the <Link color="white" onClick={onOpenTos}>Terms of Service</Link> and{' '}
                <Link color="white" onClick={onOpenPrivacy}>Privacy Policy</Link>, including Cookie Use.
              </Text>
              <Drawer placement="left" onClose={onCloseTos} isOpen={isOpenTos}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Terms of Service</DrawerHeader>
                    <DrawerBody>
                      {/* Your terms of service content */}
                      Welcome to Universe! By using our services, you agree to comply with
                      and be bound by the following terms and conditions.<br /><br />
                      <strong>Use of Our Services:</strong> You must only use our services for lawful
                      purposes and in accordance with these terms. <br /><br />
                      <strong>User Accounts:</strong> To access certain features of our services, you may
                      be required to create a user account. You are responsible for maintaining the
                      confidentiality of your account credentials. <br /><br />
                      <strong>Content:</strong> Users are solely responsible for the content they submit
                      on our platform. We reserve the right to remove any content that violates these terms.
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Drawer placement="left" onClose={onClosePrivacy} isOpen={isOpenPrivacy}>
                <DrawerOverlay>
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Privacy Policy</DrawerHeader>
                    <DrawerBody>
                    
                      Thank you for using our application. This Privacy Policy describes how we collect,
                      use, and disclose information about you. <br /><br />
                    
                    
                      <strong>Information We Collect:</strong> We collect information you provide
                      directly to us, such as your name, email address, and other details when you use our
                      services. <br /><br />
                    
                    
                      <strong>How We Use Your Information:</strong> We use the information we collect to
                      provide, maintain, and improve our services, as well as to communicate with you. <br /><br />
                    
                    
                      <strong>Sharing Your Information:</strong> We may share your information with
                      third-party service providers to help us operate, analyze usage patterns, and improve
                      our services. <br /><br />
              
                    </DrawerBody>
                  </DrawerContent>
                </DrawerOverlay>
              </Drawer>
              <Text textAlign="center" mt={4}>Already have an account?</Text>
              <Button as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")} colorScheme="blue" variant="outline" mb={4} mt={4} borderRadius='20px' color='black' _hover={{ bg: 'white', color: 'black' }}>
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
