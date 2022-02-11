import React from 'react';

const CryptoCard = ({header, timestamp, price,  volume, change}) => {
  return (
    <div className="crypto-currency-card">
        <div className="crypto-header">
            {  header }
        </div>
        <div className="crypto-timestamp"> As of: { timestamp} </div>
        <div className="crypto-data-list">
            <div className="crypto-data-entry">
                <div className="crypto-data-entry-header">Price in U.S. Dollars</div>
                <div className="crypto-data-entry-number">{price  }</div>
            </div>
            <div className="crypto-data-entry">
                <div className="crypto-data-entry-header">Volume Sold (24hrs)</div>
                <div className="crypto-data-entry-number"> {volume } </div>
            </div>
            <div className="crypto-data-entry">
                <div className="crypto-data-entry-header">Price Change (Past Hr)</div>
                <div className="crypto-data-entry-number">{ change  }</div>
            </div>
        </div>
        <div className="crypto-source">
            <a href="https://api.cryptonator.com/">Source</a>
        </div>
    </div> 
    )
};

export default CryptoCard;
