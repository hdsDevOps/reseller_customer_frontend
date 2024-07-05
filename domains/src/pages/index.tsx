import React from 'react';
import { Route, Routes } from 'react-router-dom';
const AddDomain = React.lazy(() => import('./AddDomain'));
const DomainList = React.lazy(() => import('./DomainList'));

const DomainApp: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DomainList />} />
        <Route path="/domain" element={<DomainList />} />
        <Route path="/adddomain" element={<AddDomain />} />
      </Routes>
    </div>
  );
};

export default DomainApp;
