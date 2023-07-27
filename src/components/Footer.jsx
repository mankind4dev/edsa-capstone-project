import React from 'react'

const Footer = () => {

  const today = new Date();
  return (
    <footer className='Footer'>
        <div className='sb_footer-copyright'>
          <p>@{new Date().getFullYear()} Gogo<span>Live</span>. All right reserved.</p>
        </div>
        <div className='sb_footer-below-links'>
          <a href="terms"><div><p>Teams $ Conditions</p></div></a>
          <a href="privacy"><div><p>Privacy</p></div></a>
          <a href="security"><div><p>Security</p></div></a>
          <a href="cookie"><div><p>Cookie Declaration</p></div></a>
        </div>
      
    </footer>
  )
}

export default Footer