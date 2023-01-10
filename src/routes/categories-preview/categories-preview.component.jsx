import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log(categoriesMap);
    return (
        <div className="shop-container">
            {Object.keys(categoriesMap).map((title) => {
                  const products = categoriesMap[title];  
                  return (
                    <CategoryPreview key={title} title={title} products={products} />
                  )
                })}
        </div>
    )                     
}


export default CategoriesPreview;


