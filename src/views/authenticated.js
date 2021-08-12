import styled from 'styled-components';
import { Button } from 'antd';

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  display: inline-block;
  margin-top: 200px;
`;

function Authenticated() {
    return (
        <Wrapper>
            <StyledButton
                type="primary"
                size="large"
                onClick={async () => {
                    await fetch(`${process.env.REACT_APP_BACKEND_URL}/authenticated`, { credentials: 'include' });
                }}
            >
                Check authentication
            </StyledButton>
        </Wrapper>
    );
}

export default Authenticated;

