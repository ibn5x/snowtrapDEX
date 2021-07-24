import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    
    font-size: 11px;
    width: 64px;
    margin: 3px 5px 0;
    `;

const Td = styled.td`
       border: 1px solid #cccccc;
       width: 20vw; 
       
    `;
const TdControls = styled(Td)`
        width: 34vw;
    `;

const TdName = styled(Td)`
        width: 19vw;
    `;

export default function Coin(props) {


    const handleClick = (Event) => {
        Event.preventDefault();

        props.handleRefresh(props.tickerId);
    }

    const handleBuy = (Event) => {
        Event.preventDefault();

        props.handleTransaction(true, props.tickerId);
    }

    const handleSell = (Event) => {
        Event.preventDefault();

        props.handleTransaction(false, props.tickerId);
    }
    return (
        <tr>
            <TdName>{props.name}</TdName>
            <Td>{props.ticker}</Td>
            <Td>${props.price}</Td>
            {props.showBalance ? <Td>{props.balance}</Td> : null}
            <TdControls>
                <form action="#" method="POST">
                    <Button className="btn btn-info" onClick={handleClick}>
                        <i class="fas fa-sync-alt"></i>
                    </Button>
                    <Button className="btn btn-warning" onClick={handleBuy}>BUY</Button>
                    <Button className="btn btn-danger" onClick={handleSell}>SELL</Button>
                </form>
            </TdControls>
        </tr>
    );
}
//type checking.
Coin.propTypes = {
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired
}



