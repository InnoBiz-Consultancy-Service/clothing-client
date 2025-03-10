import Faq from "@/components/Home/Faq/Faq";
import HomePage from "@/components/Home/HomePage";
import ProductCards from "@/components/Home/ProductCard/ProductCards";

export default function Home() {
  return (
    <div>
      <HomePage />
      <ProductCards/>
      <Faq />
    </div>
  );
}
