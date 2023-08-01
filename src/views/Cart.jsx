import { useContext, useEffect } from "react"
import DataContext from "../context/DataContext"
import { Button } from "react-bootstrap"

const Cart = () => {
  const { shopCart, increase, decrease, removeFromCart, formatNumber } = useContext(DataContext)

  const updatedCart = shopCart.filter((item) => item.count > 0)

  useEffect(() => {
    removeFromCart(updatedCart)
  }, [])

  const total = updatedCart.reduce((a, { count, price }) => a + price * count, 0)

  const clearCart = () => {
    updatedCart.forEach((item) => removeFromCart(item.id))
  }

  return (
    <div className="container-cart">
      <div className="p-2">
        <h2>Detalles del pedido:</h2>
      </div>
      <div className="p-1">
        <ul className="cart-ul">
          {updatedCart?.map((item) => (
            <li key={item?.id} className="cart-item">
              <div className="item-details">
                <img src={item?.img} alt={item?.name} className="img-small" />
                <span className="fw-bold" style={{ textTransform: 'capitalize' }}>{item?.name}</span>
                <div className="quantity-controls">
                  <span className="fw-bold">Precio: $ {formatNumber(item?.price)} </span>
                  <Button variant="danger" onClick={() => decrease(item?.id)}>-</Button>
                  <b>{item?.count}</b>
                  <Button variant="primary" onClick={() => increase(item?.id)}>+</Button>
                </div>
                <span className="fw-bold">Total: ${formatNumber(item?.price * item?.count)} </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price">
          <span> Precio total del pedido: ${formatNumber(total)}</span>
        </div>
        {total > 0 && (
          <div className="btn-price">
            <Button onClick={clearCart}>Vaciar Carrito</Button>
            <Button>Ir a pagar</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
