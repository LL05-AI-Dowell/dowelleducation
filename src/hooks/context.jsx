import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, userRoles, setUserRoles }}>
      {children}
    </UserContext.Provider>
  );
};
