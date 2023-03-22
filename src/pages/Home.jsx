import Products from "../components/templates/products";

const Home = () => {

  return (
    <>
      <div className="pt-36 width-screen-main">
        <div className="text-gray-700 text-2xl font-light">
          <h4 className="mb-12">Categorías populares</h4>
          <div className="w-full flex justify-evenly items-center m-6">
            <div className="flex flex-col items-center justify-center hover:cursor-pointer">
              <img src="https://img.icons8.com/ios-filled/64/3498DB/monitor--v1.png" />
              <h5 className="text-lg">Computacion</h5>
            </div>
            <div className="flex flex-col items-center justify-center hover:cursor-pointer">
              <img src="https://img.icons8.com/wired/64/3498DB/cell-phone.png" />
              <h5 className="text-lg">Telefonia</h5>
            </div>
            <div className="flex flex-col items-center justify-center hover:cursor-pointer">
              <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/3498DB/external-shirt-camping-kiranshastry-lineal-kiranshastry.png" />
              <h5 className="text-lg">Moda y calzado</h5>
            </div>
            <div className="flex flex-col items-center justify-center hover:cursor-pointer">
              <img src="https://img.icons8.com/ios/64/3498DB/teddy-bear.png" />
              <h5 className="text-lg" >Jugueteria</h5>
            </div>
          </div>
        </div>
        <div className="text-gray-700 text-2xl font-light my-12"><h1>Explora nuestros productos</h1></div>
        <Products />
      </div>
    </>
  )
}

export default Home;
