import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Plus, CheckCircle2, Circle, MessageSquare, Calendar, Trash2, Info, MoreVertical, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Chat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { customers, addEntry, updatePaidStatus, settings } = useApp();
    const customer = customers.find(c => c.id === id);
    const isUrdu = settings.language === 'Urdu';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        products: [{ name: '', quantity: 1, price: 0, paid: false }],
        cashPaid: 0,
        dueDate: '',
    });

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [customer?.entries]);

    if (!customer) return <div className="p-10 text-center font-bold">Customer not found</div>;

    const handleAddProduct = () => {
        setNewEntry({
            ...newEntry,
            products: [...newEntry.products, { name: '', quantity: 1, price: 0, paid: false }]
        });
    };

    const updateProduct = (index, field, value) => {
        const updatedProducts = [...newEntry.products];
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setNewEntry({ ...newEntry, products: updatedProducts });
    };

    const removeProduct = (index) => {
        if (newEntry.products.length > 1) {
            const updatedProducts = newEntry.products.filter((_, i) => i !== index);
            setNewEntry({ ...newEntry, products: updatedProducts });
        }
    };

    const calculateTotal = (products) => {
        return products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    };

    const handleSubmitEntry = (e) => {
        e.preventDefault();
        addEntry(customer.id, newEntry);
        setIsModalOpen(false);
        setNewEntry({ products: [{ name: '', quantity: 1, price: 0, paid: false }], cashPaid: 0, dueDate: '' });
    };

    const totalBalance = calculateTotal(newEntry.products) - newEntry.cashPaid;

    return (
        <div className="flex flex-col h-screen bg-[#e5ddd5] relative overflow-hidden">
            {/* Premium Header */}
            <header className="bg-premium text-white p-4 pt-10 flex items-center sticky top-0 z-40 shadow-2xl rounded-b-[2rem]" style={{ background: 'var(--premium-gradient)' }}>
                <button onClick={() => navigate('/')} className="mr-2 p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
                    <ArrowLeft size={24} />
                </button>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 border border-white/20">
                    <UserPlus size={20} />
                </div>
                <div className="flex-1">
                    <h2 className="font-bold text-lg leading-tight truncate">{customer.name}</h2>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                        <div className={`w-1.5 h-1.5 rounded-full ${customer.balance > 0 ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                            {isUrdu ? 'بیلنس: ' : 'Net Balance: '} {settings.currency} {customer.balance.toLocaleString()}
                        </p>
                    </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                    <MoreVertical size={20} />
                </button>
            </header>

            {/* Modern Ledger Entries Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 pb-24"
                style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px', backgroundBlendMode: 'overlay' }}
            >
                {customer.entries.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in opacity-40">
                        <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={32} />
                        </div>
                        <p className="text-sm font-bold tracking-widest uppercase">{isUrdu ? 'کوئی اندراج نہیں' : 'No Transactions'}</p>
                    </div>
                )}

                {customer.entries.map((entry, eIdx) => {
                    const entryTotal = calculateTotal(entry.products);
                    const allPaid = entry.products.every(p => p.paid);
                    const isOverdue = entry.dueDate && new Date(entry.dueDate) < new Date() && !allPaid;

                    return (
                        <div key={entry.id} className={`flex flex-col animate-slide-up ${isUrdu ? 'items-start' : 'items-end'}`} style={{ animationDelay: `${eIdx * 0.1}s` }}>
                            <div className={`max-w-[90%] bg-white rounded-2xl shadow-xl overflow-hidden relative ${isUrdu ? 'rounded-tl-none' : 'rounded-tr-none'} border border-black/5`}>

                                {/* Entry Metadata */}
                                <div className="px-4 py-2 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <Calendar size={10} className="text-wa-primary" />
                                        {new Date(entry.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                    </div>
                                    {entry.dueDate && (
                                        <div className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter ${isOverdue ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {isUrdu ? 'آخری تاریخ: ' : 'Due: '} {new Date(entry.dueDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                        </div>
                                    )}
                                </div>

                                {/* Products List */}
                                <div className="p-4 space-y-4">
                                    {entry.products.map((p, pIdx) => (
                                        <div key={pIdx} className="flex items-start justify-between gap-4 group">
                                            <div className="flex items-start gap-3">
                                                <button
                                                    onClick={() => updatePaidStatus(customer.id, entry.id, pIdx, !p.paid)}
                                                    className={`mt-1 transition-all hover:scale-110 active:scale-90 ${p.paid ? 'text-wa-secondary' : 'text-gray-200'}`}
                                                >
                                                    {p.paid ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                                </button>
                                                <div>
                                                    <p className={`font-bold text-sm ${p.paid ? 'line-through text-gray-300' : 'text-gray-800'}`}>{p.name}</p>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase">{p.quantity} x {settings.currency}{p.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <p className={`font-black text-sm ${p.paid ? 'text-gray-300' : 'text-wa-primary'}`}>
                                                {settings.currency}{(p.price * p.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Sum & Actions */}
                                <div className={`p-4 ${isOverdue ? 'bg-red-50' : 'bg-gray-50'} border-t border-gray-100`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="text-left">
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{isUrdu ? 'ادا شدہ' : 'Paid'}</p>
                                            <p className="text-sm font-bold text-wa-secondary">{settings.currency}{(entry.cashPaid || 0).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{isUrdu ? 'کل بیلنس' : 'Amount Due'}</p>
                                            <p className="text-xl font-black text-wa-primary leading-none">{settings.currency}{(entryTotal - (entry.cashPaid || 0)).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {isOverdue && (
                                        <button
                                            onClick={() => {
                                                const msg = `Reminder: Dear ${customer.name}, a payment of ${settings.currency}${entryTotal - (entry.cashPaid || 0)} for your purchase on ${new Date(entry.date).toLocaleDateString()} was due on ${new Date(entry.dueDate).toLocaleDateString()}. Please clear your balance at ${settings.shopName}. Powered by Furqan.`;
                                                window.open(`https://wa.me/${customer.phone}/?text=${encodeURIComponent(msg)}`, '_blank');
                                            }}
                                            className="w-full bg-wa-secondary text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-wa-secondary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
                                        >
                                            <MessageSquare size={14} strokeWidth={3} /> {isUrdu ? 'ریمنڈر کال' : 'Send Reminder'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating Modern Input Area */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[90%] z-50 animate-slide-up">
                <div className="glass premium-shadow rounded-[2rem] p-2 flex items-center gap-2 border border-white/50">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-12 h-12 bg-premium text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
                        style={{ background: 'var(--premium-gradient)' }}
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>

                    <div
                        className="flex-1 bg-black/5 hover:bg-black/10 transition-colors rounded-full px-5 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider cursor-pointer flex justify-between items-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {isUrdu ? 'نیا کھاتہ لکھیں...' : 'Add ledger entry...'}
                        <Info size={16} className="opacity-50" />
                    </div>

                    <button
                        className="w-12 h-12 bg-wa-secondary text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Send size={20} className={isUrdu ? 'rotate-180' : ''} />
                    </button>
                </div>
            </div>

            {/* Modern High-End Entry Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isUrdu ? 'نیا اندراج' : 'Create New Entry'}
            >
                <form onSubmit={handleSubmitEntry} className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="space-y-4">
                        {newEntry.products.map((p, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 rounded-[2rem] relative group border border-transparent focus-within:border-wa-primary focus-within:bg-white transition-all">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-6 relative">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 px-2">{isUrdu ? 'آئٹم' : 'Product/Service Name'}</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder={isUrdu ? 'مثلاً: بلب، کام...' : 'e.g. Electric Bulb'}
                                            value={p.name}
                                            onChange={(e) => updateProduct(idx, 'name', e.target.value)}
                                            className="bg-transparent border-none p-2 text-gray-800 font-bold placeholder:font-medium placeholder:text-gray-300 focus:ring-0"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 px-2">{isUrdu ? 'تعداد' : 'Quantity'}</label>
                                        <input
                                            type="number"
                                            value={p.quantity}
                                            onChange={(e) => updateProduct(idx, 'quantity', parseInt(e.target.value) || 0)}
                                            className="bg-transparent border-none p-2 font-black text-gray-800 focus:ring-0"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1 px-2">{isUrdu ? 'قیمت' : 'Unit Price'}</label>
                                        <input
                                            type="number"
                                            value={p.price}
                                            onChange={(e) => updateProduct(idx, 'price', parseInt(e.target.value) || 0)}
                                            className="bg-transparent border-none p-2 font-black text-gray-800 focus:ring-0"
                                        />
                                    </div>
                                </div>
                                {newEntry.products.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProduct(idx)}
                                        className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="flex items-center justify-center gap-2 py-3 text-wa-primary font-black uppercase text-[10px] tracking-[0.2em] border-2 border-dashed border-gray-200 rounded-[2rem] hover:border-wa-primary hover:bg-wa-primary/5 transition-all"
                    >
                        <Plus size={16} strokeWidth={3} /> {isUrdu ? 'مزید آئٹم شامل کریں' : 'Add Another Item'}
                    </button>

                    <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-[2rem]">
                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-2">{isUrdu ? 'نقد وصولی' : 'Cash Received'}</label>
                            <input
                                type="number"
                                value={newEntry.cashPaid}
                                onChange={(e) => setNewEntry({ ...newEntry, cashPaid: parseInt(e.target.value) || 0 })}
                                className="bg-white border-transparent focus:border-wa-primary rounded-xl p-3 font-bold"
                            />
                        </div>
                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block px-2">{isUrdu ? 'ادائیگی کی تاریخ' : 'Due Date'}</label>
                            <input
                                type="date"
                                value={newEntry.dueDate}
                                onChange={(e) => setNewEntry({ ...newEntry, dueDate: e.target.value })}
                                className="bg-white border-transparent focus:border-wa-primary rounded-xl p-3 font-bold text-xs"
                            />
                        </div>
                    </div>

                    <div className="bg-premium p-6 rounded-[2.5rem] flex flex-col gap-4 shadow-2xl" style={{ background: 'var(--premium-gradient)' }}>
                        <div className="flex justify-between items-center text-white px-2">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{isUrdu ? 'باقی رقم' : 'Remaining Balance'}</p>
                                <p className="text-3xl font-black">{settings.currency}{totalBalance.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                                <TrendingUp size={24} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-white text-wa-primary py-4 rounded-2xl font-black text-lg shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {isUrdu ? 'محفوظ کریں' : 'Confirm Entry'} <Send size={20} />
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// Internal icon for summary
const TrendingUp = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);

export default Chat;
