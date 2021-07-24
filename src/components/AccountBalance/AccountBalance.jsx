import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Section = styled.section`
    text-align: right;
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-right: 10rem;
    line-height: 3rem;
    
    
`;

const Button = styled.button`
   background: black;
   border-radius: 10px;
   border: 2px solid darkgrey;
   color: white;
   margin: 0 4px;
   padding: 0.25rem 1rem;
   height: 55px;
   
4
    `;

const BalanceToggleButton = styled(Button)`
        width: 150px;
        
    
    `;


const Balance = styled.div`
    min-width: 250px;
    margin: 0.7rem 0 0 35rem; 
    font-size: 2.0em;
    color: black;
    
 `;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'

});

export default function AccountBalance(props) {


    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance'
    let balanceData = '\u00A0';
    if (props.showBalance) {
        balanceData = <> {formatter.format(props.amount)}</>
    }
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    let btnHelicopterMoney = null;
    return (
        <>
            <Balance>{balanceData}</Balance>
            <Section>
                <form action="#" method="POST">
                    <BalanceToggleButton
                        onClick={props.handleBalanceVisability}
                        className={buttonClass}>
                        {buttonText}
                    </BalanceToggleButton>
                    <Button className="btn btn-primary"
                        onClick={props.addHelicopterMoney}>
                        <i className="fas fa-coins"></i>
                    </Button>
                </form>
            </Section>
        </>
    );

}


AccountBalance.propTypes = {

    amount: PropTypes.number.isRequired
}
