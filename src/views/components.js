import React from 'react';
import { Button } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 50px;
`;

const Components = () => {
    return (
        <Wrapper>
            <Button>Click me now!</Button>
        </Wrapper>
    );
};

export default Components;
