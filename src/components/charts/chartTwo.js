import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../../CryptoContext";
import "./dashChart.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { HistoricalChart, TrendingCoins } from "../utils/api";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@material-ui/core";

export const ChartTwo = ({ day, tension, days }) => {
  const [menu, setMenu] = useState([]);
  const [btc, setBtc] = useState("ethereum");
  const { currency, setCurrency } = CryptoState();
  const [chartOne, setChartOne] = useState([]);
  const [open, setOpen] = useState(false);

  let handleFetch = async () => {
    try {
      let btcFetch = await fetch(HistoricalChart(btc, days, currency));
      if (btcFetch.status !== 200) {
        throw new Error("Oops!");
      }
      // json parsing
      let btcData = await btcFetch.json();
      console.log("response", btcData);
      setChartOne(btcData.prices);
    } catch (error) {
      console.error("error:", error);
    }
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data);
      setMenu(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log("sdfssdfsd", menu);

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line
  }, [btc, day]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const names = btc.charAt(0).toUpperCase();
  const completeName = names + btc.slice(1);

  return (
    <div className="main-div-menu">
      <div className="chartsmenu">
        <Button onClick={handleOpen}>Click to customise chart</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Chart Options</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <InputLabel htmlFor="demo-dialog-native">
                  Currency
                </InputLabel>
                <Select
                  native
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  input={<Input id="demo-dialog-native" />}
                >
                  <option aria-label="None" value="" />
                  <option value={"USD"}>USD</option>
                  <option value={"GBP"}>GBP</option>
                  <option value={"EUR"}>EUR</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-dialog-select-label">
                  Crypto
                </InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={btc}
                  onChange={(event) => setBtc(event.target.value)}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>Crypto Currency</em>
                  </MenuItem>
                  {menu.map((event, index) => {
                    const cryptoId = event.symbol.toUpperCase();
                    return (
                      <MenuItem key={index} value={event.id}>
                        {cryptoId}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="chart-1">
        {
          <Line
            data={{
              labels: chartOne.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days <= 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartOne.map((coin) => coin[1]),
                  label: `${completeName} Price ( Past ${day} ) in ${currency}`,
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
          />
        }
      </div>
    </div>
  );
};

export default ChartTwo;
