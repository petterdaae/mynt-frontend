import styled from 'styled-components';
import { Button } from 'antd';

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
                    window.location.replace("http://localhost:8080/auth/redirect");
                }}
            >
                Sign in
            </StyledButton>
        </Wrapper>
    );
}

export default Login;
