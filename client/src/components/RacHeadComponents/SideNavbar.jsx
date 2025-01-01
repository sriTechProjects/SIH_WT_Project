import React, { useContext } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import logo from "../../assets/images/drdo-logo.svg";
import { IoPersonCircle } from "react-icons/io5";
import NavItems from "./NavItems";
import { SidebarContext } from "../../App"; // Import Context

const SideNavbar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } =
    useContext(SidebarContext);

  return (
    <aside
      className={`no-scrollbar relative flex flex-col items-center pt-8 bg-white transition-all duration-300 ${
        isSidebarCollapsed ? "max-w-[7%] w-full" : "max-w-[16vw] w-full"
      } h-full px-[1.6vw] gap-y-10 overflow-y-auto`}
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
      }}
    >
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute top-2 -right-4 text-[#0E8CCA] text-3xl px-2 py-1 rounded"
        style={{
          zIndex: 10, // Ensure it appears on top of overlapping elements
        }}
      >
        {isSidebarCollapsed ? (
          <IoIosArrowDroprightCircle />
        ) : (
          <IoIosArrowDropleftCircle />
        )}
      </button>

      <div className="sidebarheader flex justify-center items-center w-full">
        <img
          src={logo}
          alt="drdo-logo"
          className={isSidebarCollapsed ? "w-4rem" : "w-[4.2rem]"}
        />
        {!isSidebarCollapsed && (
          <h1 className="text-3xl font-bold text-[#0E8CCA]">E.B.R.S.</h1>
        )}
      </div>

      <div className="sidenavbar w-full flex flex-col gap-y-8">
        <div className="sidenavbar-g1 w-full flex flex-col gap-y-2">
          <span className="group-header text-[#bbb] text-sm">MENU</span>
          <ul className="group-menu-box flex flex-col gap-y-2">
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/"
                title="Dashboard"
                icon={TbLayoutDashboardFilled}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/analytics"
                title="Analytics"
                icon={IoAnalytics}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/pannels"
                title="Listed Jobs"
                icon={MdGroups}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/expertsData"
                title="Experts"
                icon={IoPersonCircle}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/candidateData"
                title="Candidates"
                icon={IoPerson}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
          </ul>
        </div>

        <div className="sidenavbar-g2 w-full flex flex-col gap-y-2">
          <span className="group-header text-[#bbb] text-sm">TOOLS</span>
          <ul className="group-menu-box flex flex-col gap-y-2">
            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/settings"
                title="Settings"
                icon={IoSettingsSharp}
                isCollapsed={isSidebarCollapsed}
              />
            </li>

            <li className="group-menu-items flex">
              <NavItems
                link="/rachead/help"
                title="Help"
                icon={IoIosHelpCircleOutline}
                isCollapsed={isSidebarCollapsed}
              />
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
