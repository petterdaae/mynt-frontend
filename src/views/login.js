import styled from 'styled-components';
import { Button } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  margin-top: 200px;
`;

function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <StyledButton
        type="primary"
        size="large"
        onClick={() => loginWithRedirect({
          appState: {
            returnTo: "authenticated"
          }
        })}
      >
        Sign in
      </StyledButton>
    </Wrapper>
  );
}

export default Login;
