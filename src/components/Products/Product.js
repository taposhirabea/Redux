import React, {useState} from 'react'
import styled from 'styled-components'
import { useCartContext } from '../../context/cart_context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddToCart from '../Cart/AddToCart'
import { useProductsContext } from '../../context/products_context'
import { FaSearch } from 'react-icons/fa'

const Product = ({image, name, price, id }) => {
  //  const {
  //   single_products: product
  // } = useProductsContext();
  //const { id } = useParams();
  // const {
  //   name,
  //   price,
  //   images,
  // } = product;
// const { image, name, price, id }  = product
  //  const { addToCart } = useCartContext()
  //  const {id} = product

  //const [amount, setAmount] = useState(1)
  const history = useNavigate()
  const redirect = path => {
    history(path);
  };

  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={name} />
        <Link to={`/${id}`} className='link'>
          <FaSearch />
        </Link>
        {/* <button type='button' className='link' onClick={() => {addToCart(id, product)}}>Add To Cart</button> */}
        {/* <AddToCart product={product}/> */}
        {/* <Link
          to='/cart'
          className='link'
          onClick={() => addToCart( id, amount, product)}
        >
          add to cart
        </Link> */}
         
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{price}</p>
      </footer>
    </Wrapper>
  )
}
const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6.5rem;
    height: 2.5rem;
    border: 1px solid var(--clr-grey-10);
    /* border-radius: 50%; */
    transition: var(--transition);
    opacity: 0;
    color: var(--clr-white);
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`
export default Product