import styled from "styled-components";
import { base } from "../../components/size";
import { TextInput, Button, Modal } from "../../components";
import { useState } from "react";

const Wrapper = styled.div`
  margin: ${4 * base}px;
  display: flex;
  flex-direction: column;
`;

const ButtonWithRightMargin = styled(Button)`
  margin-right: ${2 * base}px;
`;

function Settings() {
  let [clientId, setClientId] = useState("");
  const [clientIdError, setClientIdError] = useState("");
  let [clientSecret, setClientSecret] = useState("");
  const [clientSecretError, setClientSecretError] = useState("");
  const [showDeleteAllDataModal, setShowDeleteAllModal] = useState(false);

  const onSubmit = async () => {
    if (!clientId) {
      setClientIdError("Client ID is required");
    }
    if (!clientSecret) {
      setClientSecretError("Client Secret is required");
    }
    if (!clientId || !clientSecret) {
      return;
    }

    clientId = clientId.trim();
    clientSecret = clientSecret.trim();

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
      setClientId("");
      setClientSecret("");
    } else {
      // TODO : Add banner message instead
    }
  };

  const synchronizeSbankenData = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/synchronize/sbanken`, {
      method: "POST",
      credentials: "include",
    });
  };

  const deleteData = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/delete`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  const signout = async () => {
    window.location.replace(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signout`
    );
  };

  return (
    <div>
      <Wrapper>
        <h2>Sbanken Credentials</h2>
        <p>
          (If you have not enabled Sbanken beta, enable it{" "}
          <a href="https://secure.sbanken.no/Home/Settings/BetaProgram">here</a>
          ) Then, visit{" "}
          <a href="https://secure.sbanken.no/Personal/ApiBeta/Info/">
            this page
          </a>{" "}
          to obtain your credentials. Note that it often takes a few minutes
          before they are valid.
        </p>
        <TextInput
          placeholder="Client ID"
          value={clientId}
          onChange={(value) => {
            setClientIdError("");
            setClientId(value);
          }}
          error={clientIdError}
        />
        <TextInput
          placeholder="Client Secret"
          value={clientSecret}
          onChange={(value) => {
            setClientSecretError("");
            setClientSecret(value);
          }}
          error={clientSecretError}
        />
        <Button onClick={onSubmit}>Update</Button>

        <h2>Synchronize Data</h2>
        <Button onClick={synchronizeSbankenData}>
          Synchronize Sbanken Data
        </Button>

        <h2>Delete data</h2>
        <Button onClick={() => setShowDeleteAllModal(true)}>
          Delete all my data
        </Button>
        <h2>Demo account</h2>
        <Button
          onClick={() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/demo/reset`, {
              method: "POST",
              credentials: "include",
            });
          }}
        >
          Reset demo account
        </Button>
        <h2>Account</h2>
        <Button onClick={signout}>Sign out</Button>

        <Modal show={showDeleteAllDataModal}>
          <p>
            You are about to delete all the data related to your account. You
            can&apos;t undo this action? Are you sure you want to proceed?
          </p>
          <ButtonWithRightMargin
            onClick={() => deleteData() && setShowDeleteAllModal(false)}
          >
            Yes, delete all my data
          </ButtonWithRightMargin>
          <Button onClick={() => setShowDeleteAllModal(false)}>
            No, cancel
          </Button>
        </Modal>
      </Wrapper>
    </div>
  );
}

export default Settings;
