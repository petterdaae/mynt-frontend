import Accounts from "./Accounts";
import { Divider, Text } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Accounts />
      <Divider />
      <Text fontWeight="bold" fontSize="24px" m="4">
        Incoming transactions
      </Text>
    </>
  );
}

export default Home;
