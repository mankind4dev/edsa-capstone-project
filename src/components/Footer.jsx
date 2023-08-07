import React from 'react'

const Footer = () => {

  const today = new Date();
  return (
    <footer className='Footer'>
        <div className='sb_footer-copyright'>
          <p>@{new Date().getFullYear()} Gogo<span>Live</span>. All right reserved.</p>
        </div>      
    </footer>
  )
}

export default Footer