import { useEffect, useContext, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import DataContext from '../context/DataContext'

const List = () => {
  const { id } = useParams()
  const { data, addToCart } = useContext(DataContext)
  const [product, setProduct] = useState()

  useEffect(() => {
    const getDataId = () => {
      const result = data.filter((item) => item.id === id)
      setProduct(result[0])
    }

    getDataId()
  }, [id, data])

  if (!product) {
    return <div>Product not found.</div>
  }

  return (
    <div className="container-list m-3">
      <Card key={product?.id} className="p-2 card-list d-flex flex-wrap">
        <div className="d-flex">
          <Card.Img variant="top" src={product?.img} className="product-image" />
          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Card.Title style={{ textTransform: 'capitalize' }}>{product?.name}</Card.Title>
              <Card.Text className="fw-bold mb-2">{product?.desc}</Card.Text>
            </div>
            <div>
              <Card.Subtitle className="mb-2 text-muted">Ingredientes:</Card.Subtitle>
              <ul className="list-unstyled">
                {product.ingredients?.map((ingredient, i) => (
                  <li className="text-capitalize" key={i}>
                    🍕 {ingredient}
                  </li>
                ))}
              </ul>
              <Card.Text className="fw-bold fs-5">${product?.price}</Card.Text>
              <Button variant="danger" className="me-3" onClick={() => addToCart(product)}>
                Añadir al 🛒
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  )
}

export default List
