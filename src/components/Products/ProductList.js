import React from 'react'
import { useProductsContext } from '../../context/products_context'
import Product from './Product'
import styled from 'styled-components'
 import Loading from '../Loading'
  import Error from '../Error'

const ProductList = () => {
  // const { products,     products_loading: loading,
  //   products_error: error, } = useProductsContext()
  const { products, loading,
     } = useProductsContext()

  if (loading) {
    return <Loading />
  }
  // if (error) {
  //   return <Error />
  // }
   return (
    <Wrapper >
      
      <div className="products-container">
        {products.map(product => {
          return <Product key={product.id} {...product} />
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