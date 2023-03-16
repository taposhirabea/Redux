import React from 'react'
import { useProductsContext } from '../../context/products_context'
import Product from './Product'
import styled from 'styled-components'

const ProductList = () => {
  const { products: products } = useProductsContext()

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    )
  }
   return (
    <Wrapper >
      {/* <h2 className="section-title">{title}</h2> */}
      <div className="products-container">
        {products.map(item => {
          return <Product key={item.id} {...item} />
        })}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  img {
    height: 175px;
  }
  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default ProductList