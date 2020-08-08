import React from 'react'
import FavoritesContext from './favoritesContext'
import useFavoritesState from './useFavoritesState'

const FavoritesProvider: React.FC = ({ children }) => {
    return (
        <FavoritesContext.Provider value={useFavoritesState()}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesProvider
