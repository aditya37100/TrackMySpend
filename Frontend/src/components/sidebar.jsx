import { useState } from "react";
import {
  HiMenu,
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
  HiSparkles,
  HiDocumentReport,
  HiCreditCard,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Splash from "./SplashScreen";

export default function SidebarComponent({getstarted}) {
  const [collapsed, setCollapsed] = useState(true);
  
  return (
    <aside
      className={`h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } bg-[#ffffff]  dark:bg-customBlack shadow-lg `}
    >
      {/* Header */}
      <div className="flex items-center justify-start p-4 border-b border-gray-700 bg-[#ffffff] dark:bg-customBlack dark:text-customLavender gap-4">
        <button onClick={() => setCollapsed(!collapsed)}>
          <HiMenu className="w-6 h-6" />
        </button>
        <div className="font-segoe">
            {collapsed ? "" : "Menu"}
        </div>
        
      </div>

      {/* Menu */}
      <nav className="flex flex-col px-2 py-4 space-y-2 text-sm">
        
        <SidebarLink link="/dashboard" onClick={getstarted} icon={HiChartPie} label="Dashboard" collapsed={collapsed} />
        <SidebarLink link="/income" onClick={getstarted} icon={HiViewBoards} label="Income" collapsed={collapsed} />
        <SidebarLink link="/expense" onClick={getstarted} icon={HiInbox} label="Expense" collapsed={collapsed} />
        <SidebarLink link="/budget" onClick={getstarted} icon={HiUser} label="Budget" collapsed={collapsed} />
        <SidebarLink link="/report" onClick={getstarted} icon={HiShoppingBag} label="Report" collapsed={collapsed} />
        <SidebarLink link="/upload" onClick={getstarted} icon={HiSparkles} label="Auto-Filling" collapsed={collapsed} isNew={true} />
        

        <div className="border-t border-gray-700 pt-4">
          <SidebarLink icon={HiChartPie} label="Upgrade to Pro" collapsed={collapsed} />
          <SidebarLink icon={BiBuoy} label="Help" collapsed={collapsed} />
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ icon: Icon, label, collapsed, onClick, link, href, isNew = false }) {
  return (
    <button
      onClick={() => {
        if (onClick && link) {
          onClick(link);
        }
      }}
      className="flex items-center p-2 text-!customLavender rounded hover:bg-[#cccccc] transition-colors relative"
    >
      <Icon className="w-5 h-5" />
      {!collapsed && (
        <div className="flex items-center ml-3">
          <span>{label}</span>
          {isNew && (
            <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-customBlue to-custom1Blue text-white rounded-full font-medium animate-pulse">
              NEW
            </span>
          )}
        </div>
      )}
    </button>
  );
}
