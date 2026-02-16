import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('khata_customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('khata_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('khata_settings');
    return saved ? JSON.parse(saved) : {
      shopName: 'Digital Khata',
      language: 'English',
      currency: 'Rs.',
      developer: 'Furqan'
    };
  });

  useEffect(() => {
    localStorage.setItem('khata_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('khata_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('khata_settings', JSON.stringify(settings));
  }, [settings]);

  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now().toString(), entries: [], balance: 0 }]);
  };

  const addEntry = (customerId, entry) => {
    setCustomers(customers.map(c => {
      if (c.id === customerId) {
        const newEntries = [...c.entries, { ...entry, id: Date.now().toString(), date: new Date().toISOString() }];
        const newBalance = newEntries.reduce((acc, current) => {
            const entryTotal = current.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
            const paid = current.cashPaid || 0;
            return acc + (entryTotal - paid);
        }, 0);
        return { ...c, entries: newEntries, balance: newBalance, lastEntryDate: new Date().toISOString() };
      }
      return c;
    }));
  };

  const updatePaidStatus = (customerId, entryId, productIndex, paid) => {
      setCustomers(customers.map(c => {
          if (c.id === customerId) {
              const newEntries = c.entries.map(e => {
                  if (e.id === entryId) {
                      const newProducts = [...e.products];
                      newProducts[productIndex] = { ...newProducts[productIndex], paid };
                      return { ...e, products: newProducts };
                  }
                  return e;
              });
              return { ...c, entries: newEntries };
          }
          return c;
      }));
  };

  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now().toString(), date: new Date().toISOString() }]);
  };

  return (
    <AppContext.Provider value={{ 
      customers, addCustomer, addEntry, updatePaidStatus,
      notes, addNote, 
      settings, setSettings 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
