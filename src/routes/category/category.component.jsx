import { useEffect , useState ,useContext} from "react";
import { useParams } from "react-router-dom";
import ProductsCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";
import "./category.styles.scss";

const Category = () => {
    const { category } = useParams();   
    const { categoriesMap } = useContext(CategoriesContext);
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

