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

function Authenticated() {
    const { logout, user, getAccessTokenSilently } = useAuth0();
    return (
        <Wrapper>
            <StyledButton
                type="primary"
                size="large"
                onClick={() =>
                    logout({
                        returnTo: window.location.origin
                    })
                }
            >
                Sign out
            </StyledButton>
            <StyledButton
                type="primary"
                size="large"
                onClick={async () => {
                    const token = await getAccessTokenSilently();
                    const response = await fetch(
                        process.env.REACT_APP_BACKEND_URL + '/authenticated',
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                    console.log(response.status);
                }}
            >
                Check authentication
            </StyledButton>

            {user && <div>{user.email}</div>}
        </Wrapper>
    );
}

export default Authenticated;

