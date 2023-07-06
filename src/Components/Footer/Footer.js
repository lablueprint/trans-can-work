import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/Images/tcw.jpg';
import FacebookLogo from '../../Assets/Images/facebook-footer-logo.svg';
import InstagramLogo from '../../Assets/Images/instagram-footer-logo.svg';
import TwitterLogo from '../../Assets/Images/twitter-footer-logo.svg';
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
        <p className="menu-title">
          Menu
        </p>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          My Profile
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'menu-options-active follow-us-text-size' : 'menu-options follow-us-text-size')}
        >
          Milestone Map
        </NavLink>
      </div>
      <div className="resources-wrapper">
        <p className="resources-title follow-us-text-size">
          More from Trans Can Work
        </p>
        <a href="https://transcanwork.org/" className="resources-text"><p>Resources</p></a>
        <a href="https://crm.bloomerang.co/HostedDonation?ApiKey=pub_8ad68ff6-13cc-11eb-8228-02b7f26d7f3d&WidgetId=15360">
          <button
            type="button"
            className="donate-button"
          >
            Donate
          </button>

        </a>
      </div>
      <div className="follow-us-wrapper">
        <p className="follow-us-text follow-us-text-size">
          Follow Us
        </p>
        <div className="social-icons-box">
          <a href="https://www.facebook.com/TransCanWork/"><img src={FacebookLogo} alt="facebook icon linking to the TCW facebook page" /></a>
          <a href="https://www.instagram.com/transcanwork/"><img src={InstagramLogo} alt="instagram icon linking to the TCW instagram page" /></a>
          <a href="https://mobile.twitter.com/transcanwork"><img src={TwitterLogo} alt="twitter icon linking to the TCW twitter page" /></a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
