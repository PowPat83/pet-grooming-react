import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

// if the images is undefined
// intially the value (image) was undefined, only then we managed to get the array
// use ES6 default params, if the images is undefined, it gonna be an empty array
// if array is undefined, it will have empty object so need to set the field to empty but our case no need
const ProductImages = ({ images = [] }) => {
  // change the state index (position in the array) = changing images
  // set main image. default is the first image on the right (first item in the array)
  const [main, setMain] = useState(images[0]);

  // return <h4>product images</h4>;
  return (
    <Wrapper>
      {/* gallery that displays all images */}
      <img src={images} alt='' className='main ' />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt=''
              key={index}
              onClick={() => setMain(images[index])}
              // check whether the url is coming from the main for the border
              className={`${image === main ? 'active' : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
