import {createContext} from "react"

export const FavouritesContext = createContext({
    favourites: [],
    setFavourites: (favourites) => {}
})