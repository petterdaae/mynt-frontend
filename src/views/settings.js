import styled from 'styled-components';
import { base } from '../components/size';
import { Input, Button } from '../components';
import { useState } from 'react';

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
`;

const StyledInput = styled(Input)`
    margin-bottom: ${4 * base}px;
`;

function Settings() {
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const onSubmit = async () => {
        console.log("Yay");

        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/secrets/sbanken`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({
                sbanken_client_id: clientId,
                sbanken_client_secret: clientSecret
            })
        });

        if (result.status === 204) {
            // TODO : Add banner message instead
            console.log("Success!");
            setClientId('');
            setClientSecret('');
        } else {
            console.log("Error!");
        }
    };

    return (
        <div>
            <h1>Settings</h1>

            <h2>Sbanken Credentials</h2>

            <StyledForm>
                <StyledInput placeholder="Client ID" value={clientId} onChange={e => setClientId(e.target.value)} />
                <StyledInput placeholder="Client Secret" value={clientSecret} onChange={e => setClientSecret(e.target.value)} />
                <Button onClick={onSubmit}>Update</Button>
            </StyledForm>
        </div>
    );
};

export default Settings;
