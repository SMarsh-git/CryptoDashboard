import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "./utils/api";
import {
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import "./styles/Table.css";
import { useHistory } from "react-router-dom";

import { FavouritesContext } from "./FavouritesContext";

import { IoStarOutline } from "react-icons/io5";



export const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { favourites, setFavourites } = useContext(FavouritesContext);

  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
    setLoading(false);
  };
  const history = useHistory();

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div className="borderdiv">
      <div className="containerTable">
        <div className="tableTitle">
          <h3> Cryptocurrency Prices by Market Capitalisation</h3>

          <TextField
            className="textfield"
            label="Search for a Crpyto Currency.."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <TableContainer>
          {loading ? (
            <LinearProgress className="loadingbar" />
          ) : (
            <Table aria-label="simple table">
              <TableHead className="tableHead">
                <TableRow className="tableheading">
                  {[
                    "Coin",
                    "Favourite",
                    "Current Price",
                    "24h Change",
                    "Percentage from All Time Low",
                    "Market Cap",
                  ].map((head) => (
                    <TableCell
                      className="headingCell"
                      key={head}
                      align="center"
                      style={{
                        color: "white",
                        fontWeight: "400",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow className="row" key={row.name}>
                        <TableCell
                          className="cell"
                          style={{
                            color: "white",
                            fontWeight: "400",
                          }}
                          onClick={() => history.push(`/coins/${row.id}`)}
                        >
                          <div className="coinCell">
                            <img src={row?.image} alt={row.name} height="50" />
                            <div className="spanSection">
                              <span>{row.symbol.toUpperCase()}</span>
                              <span>{row.name}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="cell">

                          <button
                            className="favouriteButton"
                            onClick={() =>
                              setFavourites([
                                ...favourites,
                                {
                                  cryptoName: row.id,
                                },
                              ])
                            }
                          >
                                              <IoStarOutline/>
                          </button>
                        </TableCell>
                        <TableCell
                          className="cell"
                          align="right"
                          style={{
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          {symbol} {row.current_price.toLocaleString("en-us")}
                        </TableCell>
                        <TableCell
                          className="cell"
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(53, 224, 47)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          className="cell"
                          align="right"
                          style={{
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          {row.atl_change_percentage}%
                        </TableCell>
                        <TableCell
                          className="cell"
                          align="right"
                          style={{
                            color: "white",
                            fontWeight: "400",
                          }}
                        >
                          {symbol} {row.market_cap.toLocaleString("en-us")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          className="pageList"
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </div>
    </div>
  );
};
