import React, { useState } from 'react';
import { Search, Plus, UserPlus, Filter, MoreVertical, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Home = () => {
    const { customers, addCustomer, settings } = useApp();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
    const navigate = useNavigate();

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    ).sort((a, b) => new Date(b.lastEntryDate || 0) - new Date(a.lastEntryDate || 0));

    const handleAddCustomer = (e) => {
        e.preventDefault();
        if (newCustomer.name) {
            addCustomer(newCustomer);
            setNewCustomer({ name: '', phone: '' });
            setIsModalOpen(false);
        }
    };

    const isUrdu = settings.language === 'Urdu';

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa]">
            {/* Header Section */}
            <header className="bg-premium text-white p-5 pt-12 sticky top-0 z-40 shadow-xl rounded-b-[2.5rem] overflow-hidden" style={{ background: 'var(--premium-gradient)' }}>
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Store size={120} />
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">{settings.shopName}</h1>
                        <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">{isUrdu ? 'انتظامیہ' : 'Business Ledger'}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <Filter size={20} />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative group relative z-10">
                    <input
                        type="text"
                        placeholder={isUrdu ? 'گاہک تلاش کریں...' : 'Search customers...'}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl py-3.5 px-12 focus:bg-white/20 focus:outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-4 top-4 text-white/50 group-focus-within:text-white transition-colors" size={20} />
                </div>
            </header>

            {/* Customer List */}
            <div className="flex-1 px-4 py-6 space-y-4">
                {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, idx) => (
                        <div
                            key={customer.id}
                            onClick={() => navigate(`/chat/${customer.id}`)}
                            className="bg-white p-4 rounded-3xl premium-shadow hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer border border-gray-50 flex items-center gap-4 animate-slide-up"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-wa-primary shadow-inner">
                                <UserPlus size={28} />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{customer.name}</h3>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                        {customer.lastEntryDate ? new Date(customer.lastEntryDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-1">
                                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                                        <span>ID:</span>
                                        <span className="text-gray-500">{customer.phone || '0000'}</span>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[11px] font-black tracking-tight ${customer.balance > 0 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                                        {settings.currency} {Math.abs(customer.balance).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search size={40} className="opacity-20" />
                        </div>
                        <p className="font-bold text-sm tracking-wide">{isUrdu ? 'کوئی ڈیٹا موجود نہیں' : 'No customers found'}</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-6 w-16 h-16 bg-wa-secondary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-wa-secondary/30 hover:shadow-wa-secondary/50 active:scale-90 transition-all z-50 overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                <Plus size={32} strokeWidth={3} />
            </button>

            {/* Modern Add Customer Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isUrdu ? 'نیا کھاتہ کھولیں' : 'New Customer Account'}
            >
                <form onSubmit={handleAddCustomer} className="flex flex-col gap-6 p-2">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                                {isUrdu ? 'گاہک کا نام' : 'Full Name'}
                            </label>
                            <input
                                required
                                autoFocus
                                type="text"
                                value={newCustomer.name}
                                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                placeholder={isUrdu ? 'نام درج کریں' : 'e.g. Ali Ahmed'}
                                className="w-full bg-gray-50 border-transparent focus:border-wa-primary focus:bg-white rounded-2xl p-4 transition-all"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                                {isUrdu ? 'فون / شناختی نمبر' : 'Phone / Unique ID'}
                            </label>
                            <input
                                type="text"
                                value={newCustomer.phone}
                                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                placeholder={isUrdu ? 'نمبر درج کریں' : 'e.g. 0300-1234567'}
                                className="w-full bg-gray-50 border-transparent focus:border-wa-primary focus:bg-white rounded-2xl p-4 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-wa-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-wa-primary/20 hover:brightness-105 active:scale-[0.98] transition-all"
                    >
                        {isUrdu ? 'اکاؤنٹ بنائیں' : 'Create Account'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Home;
