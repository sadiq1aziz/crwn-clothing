import './category-item-body.styles.scss';

const CategoryItemBody = ({title}) => {
    return <div className='category-body-container'>
              <h2>{title}</h2>
              <p>Shop Here</p> 
           </div>

}

export default CategoryItemBody;