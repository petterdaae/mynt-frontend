import styled from 'styled-components';
import { Button } from '../components';

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  margin-top: 200px;
`;

function Login() {
    return (
        <Wrapper>
            <StyledButton
                type="primary"
                size="large"
                onClick={() => {
                    window.location.replace(`${process.env.REACT_APP_BACKEND_URL}/auth/redirect`);
                }}
            >
                Sign in
            </StyledButton>
        </Wrapper>
    );
}

export default Login;
