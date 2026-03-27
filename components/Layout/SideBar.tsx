'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import { Home, ChevronDown, Calculator, Menu, SquareSigma, ShoppingCart, PanelRightOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuGroups = [
  {
    title: "Principal",
    items: [
      { title: "Inicio", url: "/", icon: Home },
    ]
  },
  {
    title: "Calculadoras",
    items: [
      { title: "CINA / FFC", url: "/Calculadoras/calculadora-incentivos", icon: Calculator },
      { title: "Contabilidad", url: "/Calculadoras/calculadora-contabilidad", icon: SquareSigma }
    ],
  },
  {
    title: "Herramientas",
    items: [
      { title: "Carrito de compras", url: "/Carrito/carrito-compras", icon: ShoppingCart },
    ],
  }

]


const MenuItem = ({ item, isOpen, openSidebar }: { item: any, isOpen: boolean, openSidebar: () => void }) => {
  const pathname = usePathname();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isSubItemActive = hasSubItems ? item.subItems.some((subItem: any) => subItem.url === pathname) : false;

  const [isSubMenuOpen, setSubMenuOpen] = useState(isSubItemActive);
  const isActive = item.url === pathname;

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isOpen) {
      e.preventDefault();
      openSidebar();
      if (hasSubItems) setSubMenuOpen(true);
      return;
    }
    if (hasSubItems) {
      toggleSubMenu();
    }
  };

  const commonClasses = "relative rounded-md flex flex-row mb-1.5 items-center h-11 focus:outline-none hover:bg-accent-hover hover:text-accent dark:hover:text-accent pr-6 transition-all duration-200";
  const activeClass = isActive ? 'bg-accent-hover/50 text-accent border border-accent' : '';

  return (
    <li>
      {hasSubItems ? (
        <button onClick={handleClick} className={`w-full bg-transparent text-left ${commonClasses} ${isSubItemActive ? 'text-accent' : ''}`}>
          <span className="inline-flex justify-center items-center hover:text-accent">
            <item.icon className="w-5 h-5" />
          </span>
          <span className={`ml-1 text-sm tracking-wide truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {item.title}
          </span>
          {isOpen && <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${isSubMenuOpen ? 'rotate-180' : ''}`} />}
        </button>
      ) : (
        <Link href={item.url} onClick={handleClick} className={`${commonClasses} ${activeClass}`}>
          <span className="inline-flex justify-center items-center ml-[12px] hover:text-accent">
            <item.icon className="w-5 h-5" />
          </span>
          <span className={`ml-2 text-sm tracking-wide truncate transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {item.title}
          </span>
        </Link>
      )}
      {hasSubItems && isSubMenuOpen && isOpen && (
        <ul className="pl-10 py-4">
          {item.subItems.map((subItem: any, index: number) => <MenuItem key={index} item={subItem} isOpen={isOpen} openSidebar={openSidebar} />)}
        </ul>
      )}
    </li>
  );
};

export default function Sidebar({
  children,
  isOpen,
  setIsOpen
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  const openSidebar = () => {
    if (!isOpen) setIsOpen(true);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`
        fixed
        top-0 left-0 h-full
        z-50
        flex flex-col
        transition-all duration-300
        bg-surface dark:bg-background
        ${isOpen ? 'w-64 translate-x-0' : 'md:w-16 -translate-x-full md:translate-x-0'}
        border-r border-border-sidebar
        overflow-visible
      `}>
        <nav className="flex-1 overflow-y-auto overflow-x-auto">
          <ul className="flex flex-col py-4 px-2 space-y-1">
            {menuGroups.map((group, groupIndex) => (
              <li key={groupIndex}>
                {isOpen && (
                  <div className="px-2 py-2">
                    <span className="text-xs font-bold uppercase">
                      <p className='text-accent'>{group.title}</p>
                    </span>
                  </div>
                )}
                <ul>
                  {group.items.map((item, itemIndex) => <MenuItem key={itemIndex} item={item} isOpen={isOpen} openSidebar={openSidebar} />)}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className={`transition-all duration-300 
        ${isOpen ? 'md:ml-64' : 'md:ml-16'}`
      }>
        {children}
      </div>
    </>
  );
}