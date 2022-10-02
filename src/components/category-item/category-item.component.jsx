import CategoryItemBody from '../category-item-body/category-item-body.component';
import './category-item.styles.scss';

const CategoryItem = ({category}) => {
    const { imageUrl, title } = category;
    return <div className='category-container'>
            <div className='background-image'
                   style={{
                   backgroundImage: `url(${imageUrl})`
                }}
            />
            <CategoryItemBody title={title}/>
        </div>
}

export default CategoryItem;