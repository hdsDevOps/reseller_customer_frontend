import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LadningPage from './LadningPage';
import LaningPageHeader from '../components/LaningPageHeader';
import AiPage from '../components/landingPage/AiPage';

const LandingApp: React.FC = () =>  {
  return (
    <React.Fragment>
      <div className="fixed top-0 left-0 right-0 w-full z-40 bg-white">
        <LaningPageHeader />
      </div>
      <Routes>
        <Route path='/home-page' element={<LadningPage />} />
        <Route path='/ai-page' element={<AiPage />} />
      </Routes>
    </React.Fragment>
  )
};

export default LandingApp;