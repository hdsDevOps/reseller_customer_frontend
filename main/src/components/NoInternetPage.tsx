import React from 'react';
import './NoInternetPage.css';

const NoInternetPage: React.FC = () => {
  return (
    <div className='no-internet-container'>
      <i className="bi bi-wifi-off font_100"></i>
      <h4>Check your Internet connection and try again</h4>
      <p>We couldn't connect to server.</p>
      <button type='button' onClick={() => window.location.reload()}>Refresh the page</button>
    </div>
  )
};

export default NoInternetPage;