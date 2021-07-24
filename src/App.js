import AccountBalance from './components/AccountBalance/AccountBalance';
import React, { useState, useEffect } from 'react';
import CoinList from './components/CoinList/CoinList.jsx';
import Header from './components/Header/Header.jsx';
import axios from 'axios';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';


const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App(props) {

  const [balance, setBalance] = useState(20000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins')
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id)
    //retrieve the coin prices
    const tickers = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickers + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(response => {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    });
    setCoinData(coinPriceData);
  };


  useEffect(async () => {
    if (coinData.length === 0) {
      //component did mount
      componentDidMount();
    }
  });

  const handleBalanceVisability = (Event) => {
    Event.preventDefault();
    setShowBalance(oldValue => !oldValue);
  }

  const handleTransaction = (isBuy, valueChangedId) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values };
      if (valueChangedId == values.key) {

        newValues.balance += balanceChange;
        setBalance(oldBalance => oldBalance - balanceChange * newValues.price);

      }
      return newValues;
    });
    setCoinData(newCoinData);
  };

  const handleRefresh = async (valueChangedId) => {
    const tickers = `https://api.coinpaprika.com/v1/tickers/${valueChangedId}`;
    const response = await axios.get(tickers);
    const newPriceAmount = formatPrice(response.data.quotes.USD.price);

    const newCoinData = coinData.map(({ key, ticker, name, price, balance }) => {
      let newPrice = price;
      if (valueChangedId === key) {

        newPrice = newPriceAmount;
      }
      return {
        key,
        ticker,
        name,
        price: newPrice,
        balance
      }
    });


    setCoinData(newCoinData);
  }

  const addHelicopterMoney = (Event) => {
    Event.preventDefault();
    setBalance(oldValue => oldValue + 1200);
  }

  return (
    <>
      <Header />
      <AccountBalance
        amount={balance}
        showBalance={showBalance}
        handleBalanceVisability={handleBalanceVisability}
        addHelicopterMoney={addHelicopterMoney}
      />
      <CoinList
        coinData={coinData}
        showBalance={showBalance}
        handleTransaction={handleTransaction}
        handleRefresh={handleRefresh}
      />
    </>

  );
}

export default App;