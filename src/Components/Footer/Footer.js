import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/Images/tcw.jpg';
import FacebookLogo from '../../Assets/Images/facebook-footer-logo.svg';
import InstagramLogo from '../../Assets/Images/instagram-footer-logo.svg';
import TwitterLogo from '../../Assets/Images/twitter-footer-logo.svg';
import { logout } from '../../Services/user-service';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <NavLink
        to="/"
        className="tcw-logo-wrapper"
      >
        <img src={Logo} alt="TransCanWork Logo" className="tcw-logo-img" />
      </NavLink>
      <div className="menu-wrapper">
        <NavLink
          to="/"
          className="button"
          onClick={logout}
        >
          Log Out
        </NavLink>
      </div>
      <div className="resources-wrapper">
        <p className="heading">
          More from TCW
        </p>
        <a href="https://transcanwork.org/" className="link">
          <p>Main Site</p>
        </a>
        <a href="https://crm.bloomerang.co/HostedDonation?ApiKey=pub_8ad68ff6-13cc-11eb-8228-02b7f26d7f3d&WidgetId=15360" className="link">
          <p>Donate</p>
        </a>
      </div>
      <div className="follow-us-wrapper">
        <p className="heading">
          Follow Us
        </p>
        <div className="social-icons-box">
          <a href="https://www.facebook.com/TransCanWork/" target="_blank" rel="noreferrer"><img src={FacebookLogo} alt="facebook icon linking to the TCW facebook page" /></a>
          <a href="https://www.instagram.com/transcanwork/" target="_blank" rel="noreferrer"><img src={InstagramLogo} alt="instagram icon linking to the TCW instagram page" /></a>
          <a href="https://mobile.twitter.com/transcanwork" target="_blank" rel="noreferrer"><img src={TwitterLogo} alt="twitter icon linking to the TCW twitter page" /></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
