import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../components/utils/api";
import { CryptoState } from "../CryptoContext";
import "./styles/Carousel.css";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    const fixedNum =
      coin.current_price >= 0.01
        ? coin.current_price.toFixed(2)
        : coin.current_price.toFixed(4);
    let profit = coin?.price_change_percentage_24h >= 0;
    const numberWithComma = fixedNum.toLocaleString("en-us");
    return (
      <Link className="carouselItem" to={`/coins/${coin.id}`}>
        <div>
          <img src={coin?.image} alt={coin.name} height="75" />
          
          <div className="symbols">
            <span>
              {coin?.symbol}
              &nbsp;
              <span className={profit > 0 ? "green" : "red"}>
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </span>
          </div>
          <div className="symbol">
            <span
              placeholder=""
              style={{ fontSize: 22, fontWeight: 500, marginRight: 1 }}
            >
              {symbol}
              {""}
              {coin.current_price <= 0.01 ? numberWithComma : numberWithComma}
            </span>
          </div>
        </div>
        </Link>
    );
  });

  const responsive = {
    30: {
      items: 10,
    },
    1024: {
      items: 50,
    },
  };

  return (
    <div className="container">
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={100}
          animationDuration={1000}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
          autoWidth
        />
      </div>
    </div>
  );
};

export default Carousel;
