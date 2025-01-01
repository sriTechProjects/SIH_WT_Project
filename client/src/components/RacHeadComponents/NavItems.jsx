import React from "react";
import { NavLink } from "react-router-dom";

const NavItems = ({ link, title, icon: Icon, isCollapsed }) => {
  return (
    <NavLink
      to={link}
      end
      
      className={
        isCollapsed
          ? "flex items-center justify-center rounded-full w-[3.2vw] h-[3.2vw]"
          : "flex items-center rounded-md gap-x-3 pl-4 py-4 w-full"
      }

      style={({ isActive }) =>
        isActive
          ? { backgroundColor: "blue", color: "white", backgroundImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)" }
          : { color: "#464646" }
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={"3.4vh"}
            style={{
              color: isActive ? "white" : "#464646",
            }}
          />
          <span
            className="text-md font-medium"
            style={{
              color: isActive ? "white" : "#464646",
            }}
          >
            {
                !isCollapsed ? title : ""
            }
          </span>
        </>
      )}
    </NavLink>
  );
};

export default NavItems;