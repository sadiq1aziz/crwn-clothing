import { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductsCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import "./category.styles.scss";

const Category = () => {
    const { category } = useParams();   
    const categoriesMap = useSelector(selectCategoriesMap);
    const [ products, setProducts] = useState(categoriesMap[category]);
    console.log(category, "category");
    useEffect(() => {
        setProducts(categoriesMap[category]);
        console.log("products set");
    }, [ category, categoriesMap]);
    
    
    console.log(products, "products");
    return (
        <div className="category-tile-container">
            {products && products.map((product) => {
                  return (
                    <ProductsCard key={product.id} product={product} />
                  )
                })}
        </div>
    )                     
}


export default Category;

