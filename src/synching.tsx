import { Text, Center, VStack, Spinner, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Synching() {
  const toast = useToast();
  const history = useHistory();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/synchronize/sbanken`, {
      method: "POST",
      credentials: "include",
    }).then((result) => {
      if (result.status !== 200) {
        toast({
          title: "Failed to synchronize sbanken data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      history.push("/authenticated/transactions");
    });
  });

  return (
    <Center mt="32">
      <VStack>
        <Text pb="8">Synchronizing with Sbanken</Text>
        <Spinner size="xl" />
      </VStack>
    </Center>
  );
}

export default Synching;
