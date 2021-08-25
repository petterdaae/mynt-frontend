import styled from "styled-components";
import { base } from "../components/size";
import { Input, Button } from "../components";
import { useState } from "react";

const Wrapper = styled.div`
  margin: ${4 * base}px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: ${4 * base}px;
`;

function Settings() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const onSubmit = async () => {
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
      // TODO : Add banner message instead
      console.log("Success!");
      setClientId("");
      setClientSecret("");
    } else {
      // TODO : Add banner message instead
      console.log("Error!");
    }
  };

  const synchronizeSbankenData = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/synchronize/sbanken`, {
      method: "POST",
      credentials: "include",
    });
  };

  const deleteData = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/synchronize/delete`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return (
    <div>
      <Wrapper>
        <h2>Sbanken Credentials</h2>
        <StyledInput
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <StyledInput
          placeholder="Client Secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
        <Button onClick={onSubmit}>Update</Button>
      </Wrapper>

      <Wrapper>
        <h2>Synchronize Data</h2>
        <Button onClick={synchronizeSbankenData}>
          Synchronize Sbanken Data
        </Button>
      </Wrapper>
      <Wrapper>
        <h2>Delete data</h2>
        <Button onClick={deleteData}>Delete all my data</Button>
      </Wrapper>
    </div>
  );
}

export default Settings;
