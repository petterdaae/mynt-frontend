import React from 'react';
import { Table } from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 50px;
`;

const headers = [
    "Name", "Description"
];

const data = [
    { name: 'React', description: 'A JavaScript library for building user interfaces' },
    { name: 'Redux', description: 'Predictable state container for JavaScript apps' },
    { name: 'React Router', description: 'A complete routing library for React' },
    { name: 'Redux Form', description: 'A React component for building forms with Redux' },
    { name: 'React Router Redux', description: 'A Redux binding for React Router' },
    { name: 'Redux Devtools', description: 'Developer tool for Redux with hot reloading, action replay, and customizable UI' },
    { name: 'Redux Devtools Extension', description: 'A Chrome extension for Redux Devtools' },
    { name: 'Redux Devtools Extension', description: 'A Firefox extension for Redux Devtools' }
];

const Components = () => {
    return (
        <Wrapper>
            <Table data={data} headers={headers} />
        </Wrapper>
    );
};

export default Components;
