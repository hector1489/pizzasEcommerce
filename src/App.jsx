import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataContext from './context/DataContext'
import './App.css'
import Home from './views/Home'
import Cart from './views/Cart'
import NotFound from './views/NotFound'
import List from './views/List'
import dataJson from './pizzas.json'
import Browser from './components/Browser'

function App() {
  const [data, setData] = useState([])
  const [shopCart, setShopCart] = useState([])

  useEffect(() => {
    setData(dataJson)
  }, [])

  const addToCart = ({ id, price, name, img }) => {
    setShopCart((prevShopCart) => {
      const existingProduct = prevShopCart.find((item) => item.id === id);

      if (existingProduct) {
        return prevShopCart.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevShopCart, { id, price, name, img, count: 1 }];
      }
    })
  }

  const increase = (productId) => {
    setShopCart((prevShopCart) =>
      prevShopCart.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      )
    )
  }

  const decrease = (productId) => {
    setShopCart((prevShopCart) => {
      const updatedCart = prevShopCart.map((item) =>
        item.id === productId
          ? { ...item, count: item.count - 1 }
          : item
      )

      return updatedCart.filter((item) => item.count > 0)
    })
  }

  const removeFromCart = (productId) => {
    setShopCart((prevShopCart) =>
      prevShopCart.filter((item) => item.id !== productId)
    )
  }

  const globalState = {
    data,
    setData,
    shopCart,
    setShopCart,
    addToCart,
    increase,
    decrease,
    removeFromCart,
  };

  return (
    <DataContext.Provider value={globalState}>
      <BrowserRouter>
        <div className="App">
          <Browser />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/list/:id" element={<List />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
