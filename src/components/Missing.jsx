import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main className='Missing'>
        <h1>Page not Found</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur maxime quaerat harum voluptate, animi asperiores dolores. Molestias dignissimos ducimus ad maiores veniam, laboriosam eveniet, dolor quas hic officia et quos!</p>
        <p>
          <Link to='/'>Visit our Homepage for more Information</Link>
        </p>
    </main>
  )
}

export default Missing