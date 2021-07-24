import React from 'react';
import styled from 'styled-components';
import Coin from '../Coin/Coin.jsx';
import { v4 as uuidv4 } from 'uuid';


const Table = styled.table`

    margin: 50px auto 50px 50px;
    display: inline-block;
    font-size: 1rem;
    text-align: center;

    `;

export default function CoinList(props) {

    return (
        <Table className="table table-hover table-sm table-striped table-dark table-border">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Price</th>
                    {props.showBalance ? <th>Balance</th> : null}
                    <th>Actions</th>
                </tr>

            </thead>
            <tbody>
                {
                    props.coinData.map(({ key, name, ticker, price, balance }) =>
                        <Coin
                            key={uuidv4()}
                            handleRefresh={props.handleRefresh}
                            handleTransaction={props.handleTransaction}
                            name={name}
                            ticker={ticker}
                            showBalance={props.showBalance}
                            balance={balance}
                            price={price}
                            tickerId={key}
                        />)
                }

            </tbody>
        </Table>
    );

}