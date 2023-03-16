import React from 'react'
import styled from 'styled-components'
import ProductList from '../components/Products/ProductList'

export default function HomePage() {
  return (
    <Wrapper>
      <ProductList/>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  padding: 2.5rem;
  background: var(--clr-grey-10);
`