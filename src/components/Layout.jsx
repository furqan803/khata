import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Users, Notebook, FileText, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout = () => {
    const { settings } = useApp();
    const location = useLocation();
    const isChat = location.pathname.startsWith('/chat/');

    return (
        <div className={`flex flex-col h-full ${settings.language === 'Urdu' ? 'urdu' : ''}`}>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-16">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            {!isChat && (
                <nav className="fixed bottom-0 left-0 right-0 max-w-[500px] mx-auto bg-white border-t border-gray-200 flex justify-around py-2 z-50">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[#25D366]' : 'text-[#667781]'}`}
                    >
                        <Users size={24} />
                        <span className="text-xs">{settings.language === 'Urdu' ? 'گاہک' : 'Customers'}</span>
                    </NavLink>

                    <NavLink
                        to="/notebook"
                        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[#25D366]' : 'text-[#667781]'}`}
                    >
                        <Notebook size={24} />
                        <span className="text-xs">{settings.language === 'Urdu' ? 'نوٹ بک' : 'Notebook'}</span>
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[#25D366]' : 'text-[#667781]'}`}
                    >
                        <FileText size={24} />
                        <span className="text-xs">{settings.language === 'Urdu' ? 'رپورٹس' : 'Reports'}</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `flex flex-col items-center gap-1 p-2 ${isActive ? 'text-[#25D366]' : 'text-[#667781]'}`}
                    >
                        <SettingsIcon size={24} />
                        <span className="text-xs">{settings.language === 'Urdu' ? 'سیٹنگز' : 'Settings'}</span>
                    </NavLink>
                </nav>
            )}
        </div>
    );
};

export default Layout;
