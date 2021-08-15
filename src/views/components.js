import React from 'react';
import { Table } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 50px;
`;

const Components = () => {
    return (
        <Wrapper>
            <Table />
        </Wrapper>
    );
};

export default Components;
