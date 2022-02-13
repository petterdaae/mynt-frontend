import { Button, Center, Text, HStack, VStack } from "@chakra-ui/react";

function Login() {
  return (
    <Center mt="32">
      <VStack>
        <Text fontSize="4xl" as="u" mb="4">
          Mynt
        </Text>
        <HStack>
          <Button
            colorScheme="blue"
            onClick={() => {
              window.location.replace(
                `${process.env.REACT_APP_BACKEND_URL}/auth/redirect`
              );
            }}
          >
            Sign in
          </Button>
          <Button
            ml="4"
            variant="outline"
            onClick={() => {
              window.location.replace(
                `${process.env.REACT_APP_BACKEND_URL}/auth/demo`
              );
            }}
          >
            Demo
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default Login;
