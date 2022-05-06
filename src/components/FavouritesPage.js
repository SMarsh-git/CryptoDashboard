import { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "./FavouritesContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { HistoricalChart } from "./utils/api";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import "./styles/Fav.css";


const FavouritesPage = ({ days, tension, day }) => {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { currency } = CryptoState();
  // eslint-disable-next-line
  const [faves, setFaves] = useState('bitcoin');
  


// eslint-disable-next-line
  const crypto = favourites
  let handleFetch = async () => {
   try {
     let faveChart = await fetch(HistoricalChart(favourites, days, currency))
     if (faveChart.status !== 200) {
       throw new Error ("Oops!")
     }
     let faveChartData = await faveChart.json();
     setFaves(faveChartData);
   } catch (error) {
    console.error(error.message);
   }
  }

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line
  }, [])
  
  



  return (
    <div className="LandingPage">
      <div className="navContainer">
        <Navbar />
      </div>
      <div className="Content">
        <div className="stretchDiv">
          {favourites.map((favourite) => (
            <span>
              {favourite.cryptoName}
              
              {" - "}
              <button
                onClick={() =>
                  setFavourites(
                    favourites.filter(
                      (f) => f.cryptoName !== favourite.cryptoName
                    )
                  )
                }
              >
                Delete
              </button>
            </span>
          ))}
          {<Line
            data={{
              labels: favourites.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days <= 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: favourites.map((coin) => coin[1]),
                  label: `{coin.name} Price ( Past ${day} ) in ${currency}`,
                  borderColor: "rgb(192,192,192)",
                },
              ],
            }}
            options={{
              fill: true,
              pointBorderColor: "rgb(192,192,192)",
              pointBackgroundColor: "(140, 20, 252);, 1",
              backgroundColor: "rgba(110,37,148)",
              tension: tension,
              elements: {
                point: {
                  radius: 0,
                },
              },
            }}
          /> }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavouritesPage;
