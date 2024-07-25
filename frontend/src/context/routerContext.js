import React, { createContext, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RouterContext = createContext({});

export const RouterProvider = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();

  // Ensure values are being captured correctly
  console.log(params); // Debug: Check the output here

  return (
    <RouterContext.Provider value={{ navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
