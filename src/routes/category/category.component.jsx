import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductsCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { fetchCategoriesLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import "./category.styles.scss";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const categoriesIsLoading = useSelector(fetchCategoriesLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <h2>{category.toUpperCase()}</h2>
            {categoriesIsLoading ? 
                    (<Spinner />) :
                    (<div className="category-tile-container">
                        {products && products.map((product) => {
                            return (
                                <ProductsCard key={product.id} product={product} />
                            )
                        })}
                    </div>
                    )}
        </Fragment>

    )
}


export default Category;

