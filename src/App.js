
import React, { useEffect, useState } from "react";
import './styles/App.css';
import { sampleEntries } from "./sampleData";
import cryptoImg from './img/cryptocurrency.png';
import CryptoCard from "./components/CryptoCard";
import SearchHistory from "./components/SearchHistoryItem";



function App() {  

  /*
    apiDataEntry['price'] =  'Coin Not Found';
        apiDataEntry['volumeSold'] =  'Coin Not Found';
        apiDataEntry['percentChange'] =  'Coin Not Found';
        apiDataEntry['timestamp'] = "n/a"
  */

  let defaultData = {
    "status": {
         "timestamp": 'n/a',
     },
     "data": {
          "name": 'Fetching Coin',
          'symbol': 'FC',
          'price': 'N/A',
          'volumeSold': 'N/A',
          'percentChange' : 'N/A'
     }
    
  }

  const [apiData, setApiData] = useState([defaultData ]);
  const [filteredApiData, setFilteredApiData ]  = useState([defaultData]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('btc');
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  

  useEffect(() => {
    //getData();
    searchData(query);
  }, [query]);
 

  // REMEMBER YOU NEED TO RUN SERVER.JS (npm run devStart) at port 3000 BEFORE NPM start
  const getData = async () => {

     let data = ''
     
      try {

           // REMEMBER YOU NEED TO RUN SERVER.JS (npm run devStart) at port 3000 BEFORE NPM start
          const req = 
          `http://localhost:3000/getCoinInfo`;
          
          const response = await fetch(req);
          console.log(response)
          data = await response.json()
          await console.log(data);
          await setApiData(data);
          await searchData(query);
        
          
        } catch(e) { 
          console.log('Request could not be furfilled because of ' + e);
      }  
  } 
  
  

  // search for query from the api data
  const searchData =  (searchQuery) => {

    console.log('search query is: ' + searchQuery)
    
    if(typeof searchQuery !== 'undefined'){
      searchQuery = searchQuery.toLowerCase()
    } else {
      searchQuery = 'Undefined Coin'
    }
    
    let apiDataEntry = {};
    let foundEntry = false;
    let value = sampleEntries['data']
    //let value = apiData['data']
    //console.log(value)

    // stops at errors like missing api data.
    try{
      for (let i = 0; i < 100; i++) {
      
        let coinName = value[i]['name'].toLowerCase();
        //console.log("Coin name is " + coinName)
    
        let coinSymbol = value[i]['symbol'].toLowerCase();
        //console.log("Coin symbol is " + coinSymbol)

        let coinPrice = value[i]['quote']['USD']['price'].toFixed(2);
        let coinVolumeSold = value[i]['quote']['USD']['volume_24h'].toFixed(2);
        let coinPercentChange = value[i]['quote']['USD']['percent_change_24h'].toFixed(2);

        if(searchQuery === coinName || searchQuery === coinSymbol) {
            apiDataEntry['name'] = coinName.toUpperCase();
            apiDataEntry['symbol'] =  coinSymbol.toUpperCase();
            apiDataEntry['price'] = coinPrice;
            apiDataEntry['volumeSold'] = coinVolumeSold;
            apiDataEntry['percentChange'] = coinPercentChange;
            foundEntry = true;
            break;
        }  
      }
    } catch(e){
      console.log('Error has occured while looping through objects  ' + e)
    }
    

    if(foundEntry) {
        let coinTimeStamp =  sampleEntries['status']['timestamp']
        //let coinTimeStamp =  apiData['status']['timestamp']
        apiDataEntry['timestamp'] = coinTimeStamp.slice(0, 10) + " " + coinTimeStamp.slice(11, 19) + " UTC";
        apiDataEntry['timestamp'] = new Date(apiDataEntry['timestamp']).toString()
        //console.log(apiDataEntry['timestamp']);
        

    } else {
        apiDataEntry['name'] = 'Coin Not Found';
        apiDataEntry['symbol'] =  'CNF';
        apiDataEntry['price'] =  'Coin Not Found';
        apiDataEntry['volumeSold'] =  'Coin Not Found';
        apiDataEntry['percentChange'] =  'Coin Not Found';
        apiDataEntry['timestamp'] = "n/a"
    }

    addHistoryItem(apiDataEntry['name'], apiDataEntry['price'], apiDataEntry['timestamp'])
    
    setFilteredApiData(apiDataEntry)
  
    //console.log(apiDataEntry)
      
    //console.log(apiDataArr)
  } // extractData end

  
  // get value of search bar 
  const getSearchbarSearch = (e) => {
      
    let formattedInput = e.target.value.toLowerCase().trim();

    //console.log(formattedInput);
    setSearch(formattedInput);
    //console.log(formattedInput)
     
  }
  
  // make query to search bar
  const getSearch = (e) => { 
     e.preventDefault();
     setQuery(search);
     //console.log('query is: ' + search)
     // reset search to empty string
     setSearch("");
     document.getElementsByClassName('search-bar')[0].value = '';
  }



  // add history entry
  const addHistoryItem  = (nameParam, priceParam, timeStampParam) => {
     
    try {
     
      setSearchHistoryList(prevEntries => 
        [...searchHistoryList, 
            {
                id: Date.now(), time: timeStampParam.slice(16, 21),
                name: nameParam, price: priceParam
            }
        ]
      )
    } catch(e){
        console.log('The following error has occured ' + e)
    }
   
  }

 
  
  return (
    <div className="App">

        <div className="app-header">React Crypto Info</div>
        <img src = {cryptoImg} className="crypto-img" alt="Cryptocurrency" />
        <p className="app-description">Quickly find prices for the 100 most popular cryptocurrencies </p>          
        <p className="app-description-small">All values rounded to the nearest hundrendth </p>   
        <div className="search-container">
            <input type="text" className="search-bar" onChange={getSearchbarSearch} 
                  onKeyPress={(e) => e.key === 'Enter' && getSearch(e)}  placeholder="Ethereum" />
            <a href="#" className="search-btn" onClick= {getSearch}> Search</a>
        </div>

        <div className="main-content-container">
            <CryptoCard header = {filteredApiData['name'] + " (" + filteredApiData['symbol'] + ")" }
                  timestamp = {filteredApiData['timestamp']}   price = {filteredApiData['price']} 
                  volume = {filteredApiData['volumeSold']} change = {filteredApiData['percentChange']}   />
            <div className="search-history">
                  <div className="search-history-header"> Coin Search History </div>
                  <div className="history-item-list">
                      {
                          searchHistoryList.map(item => (
                              <SearchHistory
                                    id = {item.id}
                                    key = {item.id} time = {item.time}
                                    name = {item.name} price = {item.price} 
                                    searchHistoryList = {searchHistoryList}
                                    setSearchHistoryList = {setSearchHistoryList}
                                      
                              />
                          ))
                      }
                  </div>
              </div>
        </div>

       
    </div>
  );
}

export default App;
