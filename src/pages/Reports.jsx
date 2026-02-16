import React from 'react';
import { FileText, PieChart, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Reports = () => {
    const { customers, settings } = useApp();
    const isUrdu = settings.language === 'Urdu';

    const totalReceivable = customers.reduce((acc, c) => acc + c.balance, 0);

    return (
        <div className="flex flex-col h-full bg-[#f0f2f5]">
            <header className="bg-[#075e54] text-white p-4 pt-10 sticky top-0 z-40">
                <h1 className="text-xl font-bold">{isUrdu ? 'رپورٹس' : 'Reports'}</h1>
            </header>

            <div className="p-4 space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
                    <TrendingUp size={48} className="text-[#25D366] mb-4" />
                    <p className="text-gray-500 text-sm uppercase tracking-wider">{isUrdu ? 'کل بیلنس (وصولی)' : 'Total Balance (Receivable)'}</p>
                    <h2 className="text-4xl font-black text-[#075e54] mt-2">{settings.currency}{totalReceivable}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-gray-400 uppercase">{isUrdu ? 'گاہکوں کی تعداد' : 'Total Customers'}</p>
                        <p className="text-xl font-bold mt-1">{customers.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <p className="text-xs text-gray-400 uppercase">{isUrdu ? 'ایکٹیو سیلز' : 'Active Sales'}</p>
                        <p className="text-xl font-bold mt-1">12</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-gray-400 h-48 border-2 border-dashed border-gray-100">
                    <PieChart size={32} className="mb-2 opacity-20" />
                    <p className="text-sm">{isUrdu ? 'تفصیلی رپورٹ جلد آ رہی ہے' : 'Detailed analytics coming soon'}</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
