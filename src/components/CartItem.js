import React from 'react'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import styled from 'styled-components'
import CartColumns from './CartColumns'
import { useProductsContext } from '../context/products_context'

export default function CartItem() {
  const {id, amount, increase, decrease, reset } = useProductsContext()
  return (
    <Wrapper>
      
      <div className='title'>
        <img src='https://cdn.pixabay.com/photo/2016/01/21/21/23/rose-1154830_960_720.png' alt='' />
        <div>
          <h5 className='name'>Hair Dryer</h5>

          <h5 className='price-small'>$125</h5>
        </div>
      </div>
      <AmountButtons amount={amount} increase={increase} decrease={decrease} />

      <button className='reset-btn' onClick={reset}>
        <FaTrash />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .price-small {
    color: var(--clr-primary-5);
  }

  .reset-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .price-small {
      display: none;
    }
    .name {
      font-size: 0.85rem;
    }

    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
  }
`
