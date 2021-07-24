import React, { Component } from 'react';
import styled from 'styled-components';
import snowman from '../../snowman.png';

const Heady = styled.header`
        background-color: #282c34;
        min-height: 20vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
`;

const DIVAPP = styled.div`
     text-align: center;
     background-color: darkgrey;
`;
const H1 = styled.h1`
      font-size: 4rem;
      color: white;
`;
const Logo = styled.img`
     height: 8rem;
     pointer-events: none;

`;

const Small = styled.div`
    font-size: 1rem;
    display: inline-block;
`;

export default class Header extends Component {
    render() {
        return (
            <DIVAPP>
                <Heady>
                    <Logo src={snowman} alt="logo" />
                    <H1 className="App-title">
                        Snowtrap DEX <Small>v2</Small>
                    </H1>

                </Heady>
            </DIVAPP>
        );
    }
} 