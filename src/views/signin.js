import styled from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  margin-top: 200px;
`;

function Signin() {
  return (
    <Wrapper>
      <StyledButton type="primary" size="large">
        Sign in
      </StyledButton>
    </Wrapper>
  );
}

export default Signin;

