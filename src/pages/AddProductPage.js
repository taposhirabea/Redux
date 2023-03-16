import React, { useState } from 'react'
import styled from 'styled-components'
import {fs, storage} from '../firebase'

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('select');

  const [imageError, setImageError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');

  const types = ['image/jpg', 'image/jpeg', 'image/png', ' image/PNG']
  const handleProductImg=(e) =>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile && types.includes(selectedFile.type)){
        setImage(selectedFile);
        setImageError('');
      }
      else{
        setImage(null);
        setImageError('enter a valid image path')
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
  const handleAddProducts = (e) =>{
    e.preventDefault();
    const uploadTask = storage.ref('product-images/${image.name}').put(image);
    uploadTask.on('state_changed', snapshot => {
      const process = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
      console.log(process);
    }, error => setUploadError(error.message), () => {
      storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
        fs.collection('products').add({
          name,
          description,
          price: Number(price),
          color,
          url
        }).then(() => {
          setSuccessMsg('product added successfully');
          setName('');
          setDescription('');
          setPrice('');
          setColor('');
          document.getElementById('file').value='';
          setImageError('');
          setUploadError('');
          setTimeout(() => {
            setSuccessMsg('');
          }, 3000)
        }).catch (error => setUploadError(error.message));
      })
    })
  }
  return (
    <Wrapper className='section-center'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
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
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div className='submit'>
                    <button type="submit" className='btn'>
                        SUBMIT
                    </button>
                </div>
            </form>
            </div>
                {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}

        </Wrapper>
  )
}

const Wrapper = styled.article`
 /* align-items: center;
  justify-items: center;
  display: block; */
/* .add-center{
  align-items: center;
  justify-items: center;
} */
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