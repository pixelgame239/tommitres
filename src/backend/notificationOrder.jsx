import React, { createContext, useState, useContext } from 'react';

const UnreadContext = createContext();

export const useUnreadContext = () => {
  return useContext(UnreadContext);
};

export const UnreadProvider = ({ children }) => {
  const [unread, setUnread] = useState(0);

  return (
    <UnreadContext.Provider value={{ unread, setUnread }}>
      {children}
    </UnreadContext.Provider>
  );
};
