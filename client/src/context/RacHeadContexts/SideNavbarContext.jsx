import React, { createContext, useContext, useState } from "react";

const SideNavbarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SideNavbarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SideNavbarContext.Provider>
  );
};

export const useSidebar = () => useContext(SideNavbarContext);
