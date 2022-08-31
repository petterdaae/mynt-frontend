import { Button, Center, HStack, VStack } from "@chakra-ui/react";

function Login() {
  return (
    <Center mt="32">
      <VStack>
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => {
              window.location.replace(
                `${process.env.REACT_APP_BACKEND_URL}/auth/redirect`
              );
            }}
          >
            Sign in with Google
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default Login;
