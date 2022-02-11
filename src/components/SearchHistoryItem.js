import React from 'react';

const SearchHistory = ({id, time, name, price, searchHistoryList, setSearchHistoryList}) => {

  //delete entries
  const deleteEntry = () => {
      setSearchHistoryList(searchHistoryList.filter((entry) => entry.id !== id ))
  }

  return (

    <div className="history-item">
        <div className="history-item-number history-data">
              <span>Time: </span>  {time}
        </div>
        <div className="history-item-name history-data">
            <span> Coin: </span> {name}
        </div>
        <div className="history-item-price history-data">
            <span> Price: </span> ${price}
        </div>
        <button className="delete-entry history-data" onClick = {deleteEntry}>
            X
        </button>
    </div>

  )
};

export default SearchHistory;
