import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import CoinPage from "./components/CoinPage";
import MainDiv from "./components/MainDiv";

import { FavouritesContext } from "./components/FavouritesContext";
import { useState } from "react";
import FavouritesPage from './components/FavouritesPage';







const App = () => {
  const [favourites,setFavourites] = useState([])


  return (
 
    <div className="App">
      <FavouritesContext.Provider value={{favourites,setFavourites}}>
        <BrowserRouter>
          <Route path="/" component={MainDiv} exact />
          <Route path={"/coins/:id"} component={CoinPage} exact />
          <Route path="/favourites" component={FavouritesPage} exact/>
        </BrowserRouter>
      </FavouritesContext.Provider>
    </div>
  );
};

export default App;
