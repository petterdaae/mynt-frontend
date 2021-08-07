import { Button } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  margin-top: 200px;
`;

function App() {
  return (
    <Wrapper>
      <StyledButton type="primary" size="large">
        Sign in
      </StyledButton>
    </Wrapper>
  );
}

export default App;
