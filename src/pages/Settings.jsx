import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Banknote, Edit3, User, ShieldCheck, ChevronRight, LogOut, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Settings = () => {
    const { settings, updateSettings } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shopName, setShopName] = useState(settings.shopName);

    const handleUpdateShopName = (e) => {
        e.preventDefault();
        updateSettings({ shopName });
        setIsModalOpen(false);
    };

    const languages = ['English', 'Urdu'];
    const currencies = ['Rs', '$', '€', '£'];

    const isUrdu = settings.language === 'Urdu';

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] pb-20">
            {/* Header Section */}
            <header className="bg-premium text-white p-5 pt-12 shadow-xl rounded-b-[2.5rem] overflow-hidden" style={{ background: 'var(--premium-gradient)' }}>
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <SettingsIcon size={120} />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 border border-white/30 shadow-2xl">
                        <User size={40} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">{settings.shopName}</h1>
                    <p className="text-white/70 text-[10px] uppercase font-bold tracking-[0.2em]">{isUrdu ? 'ترجیحات' : 'Business Settings'}</p>
                </div>
            </header>

            {/* Settings Grid */}
            <div className="p-6 space-y-6">

                {/* Account Section */}
                <section>
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">Account</h2>
                    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-gray-50">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                    <Edit3 size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{isUrdu ? 'دکان کا نام تبدیل کریں' : 'Change Shop Name'}</p>
                                    <p className="text-xs text-gray-400 font-medium">Manage your brand identity</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-300" />
                        </button>
                    </div>
                </section>

                {/* Localization Section */}
                <section>
                    <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">Localization</h2>
                    <div className="bg-white rounded-[2rem] premium-shadow overflow-hidden border border-gray-50">
                        {/* Language */}
                        <div className="p-5 border-b border-gray-50">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-green-50 text-wa-primary rounded-xl flex items-center justify-center">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{isUrdu ? 'زبان' : 'App Language'}</p>
                                    <p className="text-xs text-gray-400 font-medium">Select your preferred dialect</p>
                                </div>
                            </div>
                            <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl">
                                {languages.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => updateSettings({ language: lang })}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${settings.language === lang
                                                ? 'bg-white text-wa-primary shadow-md'
                                                : 'text-gray-400 hover:text-gray-600'
                                            }`}
                                    >
                                        {lang} {settings.language === lang && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Currency */}
                        <div className="p-5">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                    <Banknote size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{isUrdu ? 'کرنسی' : 'Currency Symbol'}</p>
                                    <p className="text-xs text-gray-400 font-medium">Transactional unit used</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {currencies.map(curr => (
                                    <button
                                        key={curr}
                                        onClick={() => updateSettings({ currency: curr })}
                                        className={`py-3 rounded-xl text-lg font-black transition-all ${settings.currency === curr
                                                ? 'bg-wa-primary text-white shadow-xl'
                                                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                            }`}
                                    >
                                        {curr}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Developer Info */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative shadow-2xl">
                    <ShieldCheck size={100} className="absolute -right-5 -bottom-5 opacity-10 rotate-12" />
                    <div className="relative z-10 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Developer</p>
                        <h3 className="text-2xl font-black tracking-tight">Furqan</h3>
                        <p className="text-[10px] text-white/60 mt-2 font-medium">Professional Ledger Solutions</p>
                        <div className="mt-6 flex justify-center">
                            <span className="bg-white/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/50">Digital Khata v2.0</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem('khata_auth');
                        window.location.reload();
                    }}
                    className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-2"
                >
                    <LogOut size={14} /> {isUrdu ? 'لاگ آؤٹ' : 'Logout Account'}
                </button>

            </div>

            {/* Modern Pop-up Modal for Shop Name */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isUrdu ? 'دکان کا نام' : 'Shop Identity'}
            >
                <form onSubmit={handleUpdateShopName} className="flex flex-col gap-6">
                    <div className="group">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                            Shop Name
                        </label>
                        <input
                            required
                            autoFocus
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            className="w-full bg-gray-50 border-transparent focus:border-wa-primary focus:bg-white rounded-2xl p-4 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-wa-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-wa-primary/20 hover:brightness-105 active:scale-[0.98] transition-all"
                    >
                        {isUrdu ? 'محفوظ کریں' : 'Update Profile'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Settings;
