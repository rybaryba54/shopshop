import React from 'react';
import { Header } from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import ScrollBtn from '../ScrollBtn/ScrollBtn';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollBtn />
      <Footer />
    </>
  );
};
