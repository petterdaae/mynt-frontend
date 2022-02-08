import { useState } from "react";
import {
  VStack,
  Text,
  Input,
  Button,
  Divider,
  HStack,
  useToast,
} from "@chakra-ui/react";

function Settings() {
  let [clientId, setClientId] = useState("");
  const [clientIdError, setClientIdError] = useState("");
  let [clientSecret, setClientSecret] = useState("");
  const [clientSecretError, setClientSecretError] = useState("");
  const [sbankenLoading, setSbankenLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    clientId = clientId.trim();
    clientSecret = clientSecret.trim();
    if (!clientId) {
      setClientIdError("Client ID is required");
    }
    if (!clientSecret) {
      setClientSecretError("Client Secret is required");
    }
    if (!clientId || !clientSecret) {
      return;
    }

    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/secrets/sbanken`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          sbanken_client_id: clientId,
          sbanken_client_secret: clientSecret,
        }),
      }
    );

    if (result.status === 204) {
      toast.closeAll();
      toast({
        title: "Successfully updated sbanken credentials",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setClientId("");
      setClientSecret("");
    } else {
      toast.closeAll();
      toast({
        title: "Failed to update sbanken credentials",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // TODO : Add banner message instead
    }
  };

  const synchronizeSbankenData = async () => {
    setSbankenLoading(true);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/synchronize/sbanken`, {
      method: "POST",
      credentials: "include",
    }).then((result) => {
      if (result.status === 200) {
        toast.closeAll();
        toast({
          title: "Successfully synchronized sbanken data",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast.closeAll();
        toast({
          title: "Failed to synchronize sbanken data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setSbankenLoading(false);
    });
  };

  const signout = async () => {
    window.location.replace(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signout`
    );
  };

  return (
    <VStack align="left" m="2">
      <Text fontSize="xl">Sbanken Credentials</Text>
      <Text>
        (If you have not enabled Sbanken beta, enable it{" "}
        <a href="https://secure.sbanken.no/Home/Settings/BetaProgram">here</a>)
        Then, visit{" "}
        <a href="https://secure.sbanken.no/Personal/ApiBeta/Info/">this page</a>{" "}
        to obtain your credentials. Note that it often takes a few minutes
        before they are valid.
      </Text>
      <HStack align="start">
        <VStack align="left">
          <Input
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => {
              setClientIdError("");
              setClientId(e.target.value);
            }}
          />
          <Text color="red">{clientIdError}</Text>
        </VStack>
        <VStack align="left">
          <Input
            placeholder="Client Secret"
            value={clientSecret}
            onChange={(e) => {
              setClientSecretError("");
              setClientSecret(e.target.value);
            }}
          />
          <Text color="red">{clientSecretError}</Text>
        </VStack>
        <Button onClick={onSubmit}>Update</Button>
      </HStack>

      <Divider />

      <Text fontSize="xl">Synchronize Data</Text>
      <HStack>
        <Button
          isLoading={sbankenLoading}
          onClick={synchronizeSbankenData}
          colorScheme="blue"
        >
          Synchronize Sbanken Data
        </Button>
      </HStack>

      <Divider />

      <Text fontSize="xl">Account</Text>
      <HStack>
        <Button onClick={signout} variant="outline">
          Sign out
        </Button>
      </HStack>
    </VStack>
  );
}

export default Settings;
