import { useContext } from "react"
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import DataContext from "../context/DataContext"
import { useNavigate } from "react-router-dom"

const Cards = () => {
  const { data, addToCart, formatNumber } = useContext(DataContext)
  const navigate = useNavigate()

  const handleProduct = (id) => {
    navigate(`/list/${id}`)
  }

  return (
    <>
      {data?.map((item) => (
        <Card key={item?.id} className="p-2">
          <Card.Img variant="top" src={item?.img} />
          <Card.Body>
            <div className="ms-auto">
              <Card.Title style={{ textTransform: 'capitalize' }}>{item?.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Ingredientes :</Card.Subtitle>
              <ListGroup variant="flush" className="mb-3">
                {item.ingredients?.map((ingredient, i) => (
                  <ListGroupItem className="border-0 text-capitalize" key={i}>
                    🍕 {ingredient}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Card.Text className="fw-bold fs-5">
              ${formatNumber(item.price)}
            </Card.Text>
              <Button variant="danger" className="me-3" onClick={() => addToCart(item)}>
                Añadir al 🛒
              </Button>
              <Button variant="primary" onClick={() => handleProduct(item?.id)}>
                Ver más 👀
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Cards
