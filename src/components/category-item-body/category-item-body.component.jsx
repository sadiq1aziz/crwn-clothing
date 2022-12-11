import { CategoryBodyContainer } from "./category-item-body.styles";

const CategoryItemBody = ({title}) => {
    return <CategoryBodyContainer>
              <h2>{title}</h2>
              <p>Shop Here</p> 
           </CategoryBodyContainer>
}

export default CategoryItemBody;