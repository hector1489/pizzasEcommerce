import Gallery from '../components/Gallery'


const Home = () => {
    return (
        <>
        <div className="container-home text-center">
            <h1 className="fw-bold">¡Pizzeria Mamma Mia!</h1>
            <span className="fw-bold">¡las mejores pizzas que podras encontrar!</span>
            <hr />
            <br />
        </div>
        <Gallery />
        </>
    )
}

export default Home