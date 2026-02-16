import React, { useState } from 'react';
import { Book, Plus, StickyNote, Calendar, Trash2, Edit2, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Notebook = () => {
    const { notes, addNote, deleteNote, settings } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    const isUrdu = settings.language === 'Urdu';

    const handleAddNote = (e) => {
        e.preventDefault();
        if (newNote.title && newNote.content) {
            addNote(newNote);
            setNewNote({ title: '', content: '' });
            setIsModalOpen(false);
        }
    };

    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] pb-20">
            {/* Header Section */}
            <header className="bg-premium text-white p-5 pt-12 sticky top-0 z-40 shadow-xl rounded-b-[2.5rem] overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)' }}>
                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                    <Book size={120} />
                </div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">{isUrdu ? 'نوٹ بک' : 'Business Notes'}</h1>
                        <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">{isUrdu ? 'خاص یاد دہانی' : 'Special Reminders'}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative group relative z-10">
                    <input
                        type="text"
                        placeholder={isUrdu ? 'نوٹس تلاش کریں...' : 'Search your notes...'}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-2xl py-3.5 px-12 focus:bg-white/20 focus:outline-none transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-4 top-4 text-white/50 group-focus-within:text-white transition-colors" size={20} />
                </div>
            </header>

            {/* Notes Grid */}
            <div className="p-4 space-y-4">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note, idx) => (
                        <div
                            key={note.id}
                            className="bg-white p-5 rounded-[2rem] premium-shadow border border-gray-50 flex flex-col gap-4 animate-slide-up relative overflow-hidden group"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            {/* Note Content */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        <h3 className="font-black text-gray-800 text-lg leading-tight uppercase tracking-tight">{note.title}</h3>
                                    </div>
                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">{note.content}</p>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <Calendar size={10} className="text-orange-400" />
                                        {new Date(note.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-gray-100"></span>
                                        <span className="w-2 h-2 rounded-full bg-gray-100"></span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Accent */}
                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400/5 to-orange-500/10 rounded-tl-full -mr-4 -mb-4 transition-all group-hover:scale-110"></div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300 animate-fade-in">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <StickyNote size={40} className="opacity-20" />
                        </div>
                        <p className="font-bold text-sm tracking-wide uppercase">{isUrdu ? 'کوئی نوٹس نہیں ملے' : 'Your notebook is empty'}</p>
                    </div>
                )}
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30 active:scale-95 transition-all z-50 overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                <Plus size={32} strokeWidth={3} />
            </button>

            {/* Modern High-End Form */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={isUrdu ? 'نیا نوٹ' : 'Create New Note'}
            >
                <form onSubmit={handleAddNote} className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Note Title</label>
                            <input
                                required
                                autoFocus
                                type="text"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                placeholder={isUrdu ? 'عنوان درج کریں' : 'e.g. Electrician Contact'}
                                className="w-full bg-gray-50 border-transparent focus:border-orange-400 focus:bg-white rounded-2xl p-4 transition-all"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Content</label>
                            <textarea
                                required
                                rows={5}
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                placeholder={isUrdu ? 'تفصیل لکھیں...' : 'Write your details here...'}
                                className="w-full bg-gray-50 border-transparent focus:border-orange-400 focus:bg-white rounded-[2rem] p-5 transition-all resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {isUrdu ? 'نوٹ محفوظ کریں' : 'Save Special Note'} <Plus size={20} />
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default Notebook;
