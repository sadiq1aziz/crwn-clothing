import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { fetchCategoriesLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const categoriesIsLoading = useSelector(fetchCategoriesLoading);
    return (
        <div className="shop-container">
            {categoriesIsLoading ? <Spinner/> : Object.keys(categoriesMap).map((title) => {
                  const products = categoriesMap[title];  
                  return (
                    <CategoryPreview key={title} title={title} products={products} />
                  )
                })}
        </div>
    )                     
}


export default CategoriesPreview;


