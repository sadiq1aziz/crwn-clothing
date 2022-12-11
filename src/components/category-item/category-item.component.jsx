import CategoryItemBody from '../category-item-body/category-item-body.component';
import { BackgroundImage, CategoryItemContainer } from './category-item.styles.jsx';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ category }) => {

  const navigate  = useNavigate();
  
  const navigateHandler = () => {
    navigate(route);
  }
    const { imageUrl, title, route } = category;
    return <CategoryItemContainer onClick={navigateHandler}>
        <BackgroundImage imageUrl={imageUrl} />
        <CategoryItemBody title={title} />
    </CategoryItemContainer>
}

export default CategoryItem;