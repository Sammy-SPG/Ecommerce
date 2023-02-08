import Products from "../components/templates/products";

const Home = () => {

  return (
    <>
      <div className="max-w-screen-xl w-4/5 m-auto">
        <div className="text-slate-500 text-xl"><h1 className="my-3">Explora nuestros productos</h1></div>
      </div>
      <Products />
    </>
  )
}

export default Home;
