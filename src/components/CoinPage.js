import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { SingleCoin } from "./utils/api";
import { CryptoState } from "../CryptoContext";
// import ChartTwo from "./charts/chartTwo";
import Navbar from "./Navbar";
import Ethbtcchart from "./charts/dashboardCharts";
import Footer from "./Footer";
import "./styles/CoinPage.css";

const CoinPage = ({ btcData, data, user }) => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log("data", { data });

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="wholePage">
        <div className="topSection">
          <div className="coinInfoDiv">
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <h3 className="headingTitle">{coin?.name}</h3>
            <h3 className="headingSymbol">{coin?.symbol.toUpperCase()}</h3>
          </div>
          <div className="descContainer">
            <div className="abitofthis"></div>
            <div className="description">
              <p>{ReactHtmlParser(coin?.description.en)}</p>
            </div>
            <div className="abitofthat"></div>
          </div>
        </div>
        <div className="marketDataMaster">
          <div className="marketDataTitles">
            <div className="marketDataHeading">
              <h5 className="heading">Rank:</h5>
            </div>
            <div className="marketDataHeading">
            <h5 className="heading">Current Price:</h5>
            </div>
            <div className="marketDataHeading">
            <h5 className="heading">Market Cap:</h5>
            </div>
            <div className="marketDataHeading">
            <h5 className="heading">All Time High (ATH):</h5>
            </div>
            <div className="marketDataHeading">
            <h5 className="heading">Current Circulating Supply:</h5>
            </div>
            <div className="marketDataHeading">
            <h5 className="heading">Max Supply:</h5>
            </div>
          </div>
          <div className="marketDataInfo">
            <div className="marketDataStats">
            <h6 className="heading">{coin?.market_cap_rank}</h6>
            </div>
            <div className="marketDataStats">
            <h6 className="heading">
              {symbol} {coin?.market_data.current_price[currency.toLowerCase()]}
            </h6>              
            </div>
            <div className="marketDataStats">
            <h6>
              {symbol}{" "}
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </h6>
            </div>
            <div className="marketDataStats">
            <h6 className="heading">
              {symbol} {coin?.market_data.ath[currency.toLowerCase()]}
            </h6>
            </div>
            <div className="marketDataStats">
            <h6 className="heading">{coin?.market_data.circulating_supply}</h6>
            </div>
            <div className="marketDataStats">
            <h6 className="heading">{coin?.market_data.max_supply}</h6>
            </div>
          </div>
        </div>
        <Ethbtcchart />
      </div>

      <Footer />
    </div>
  );
};

export default CoinPage;
