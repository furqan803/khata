import React, { useState } from 'react';
import { LogIn, ShieldCheck, Store } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" style={{ background: 'linear-gradient(135deg, #00a884 0%, #128c7e 100%)' }}>
            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-[400px] p-8 animate-slide-up">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 shadow-2xl border border-white/30">
                        <Store size={48} className="text-white drop-shadow-md" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">Digital Khata</h1>
                    <p className="text-white/70 text-sm mt-2 font-medium">Business Ledger Reimagined</p>
                </div>

                {/* Login Card */}
                <div className="glass premium-shadow rounded-[2.5rem] p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <ShieldCheck size={100} />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-black/5 border-none rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-wa-primary/50"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 border-none rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-wa-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-wa-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-wa-primary/20 hover:shadow-2xl hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            Sign In <LogIn size={20} />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-black/5 flex justify-center">
                        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Secured by Furqan</p>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-10 text-center">
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">© 2026 Small Business Solutions</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
