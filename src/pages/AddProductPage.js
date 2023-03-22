import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context';
import {fs, storage} from '../firebase'

export default function AddProductPage() {

  const navigate = useNavigate()
  // const redirect = path => {
  //   navigate(path);
  // };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('select');
  const [featured, setFeatured] = useState(true);
 
  const [error, setError] = useState('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', ' image/PNG']
  
  const handleProductImg=(e) =>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile && types.includes(selectedFile.type)){
        setImage(selectedFile);
        setError('');
      }
      else{
        setImage(null);
        setError('enter a valid image path')
      }
    }
    else{
      console.log('pls select ur file')
    }
  }
  const handleColorChange=(e) => {
  setColor(e.target.value);
  console.log(color)
}

  // add product
  const handleAddProducts = (e) =>{
    e.preventDefault();

    // storing the image
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, err => {
      setError(err.message)
    }, () => {

      // getting product url and if success then storing the product in the database
      storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
        fs.collection('Products').add({
          name,
          description,
          price: Number(price),
          color,
          image: url,
          featured,
        }).then(() => {
          setName('');
          setDescription('');
          setPrice('');
          setColor('');
          setFeatured();
          setError('');
          document.getElementById('file').value='';

        }).catch (err => setError(err.message));
        //navigate('/')
      })
    })
    navigate('/')
    
  }
  return (
    <Wrapper className='section-center'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        

            <div className='add-center'>  
            <form autoComplete="off" className='form-group ' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                  <input type="text" className='form-control' required
                onChange={(e)=>setName(e.target.value)} value={name}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input>
                <br></br>
                <label>Color</label>
                <select id="color" name="color" className='form-control' onChange={handleColorChange} required>
                  <option value="#000">Black</option>
                  <option value="#ffb900">Orange</option>
                  <option value="#0000ff">Blue</option>
                  <option value="#ff0000">Red</option>
                </select>
                
                <br></br>           
                <div className='submit'>
                    <button type="submit" className='btn' >
                        SUBMIT
                    </button>
                </div>
            </form>
            {error && <span>{error}</span>}
            </div>
               

        </Wrapper>
  )
}

const Wrapper = styled.article`

.submit{
  display: flex;
  justify-content: center;
}
.btn{
  padding: 0.75rem 1.5rem;
      font-size: 1rem;
}
.btn:hover {
  color: var(--clr-primary-1);
  background: var(--clr-primary-7);
}
`