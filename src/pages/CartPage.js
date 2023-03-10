import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CartColumns from '../components/CartColumns'
import CartItem from '../components/CartItem'

export default function CartPage() {
  return (
    <article className='cart-center'>
      <CartColumns/>
      <CartItem/>
    </article>
  )
}

const Cart = styled.article`
 .cart-center {
  margin-top: 6rem;
 }
`