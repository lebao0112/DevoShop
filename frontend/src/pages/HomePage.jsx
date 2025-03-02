import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import ProductCarousel from "../components/ProductCarousel";

export default function HomePage() {

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Banner />
      </div>
      <hr className="my-8 border-2 border-redPrimary"> 
      </hr>
      <ProductCarousel />
    </>
  );
}
