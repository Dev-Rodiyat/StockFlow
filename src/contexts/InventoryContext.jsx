import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

const InventoryContext = createContext();

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
};

const getInitialInventory = () => {
    try {
        const stored = localStorage.getItem('inventoryItems');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to parse inventory from localStorage:', error);
        return [];
    }
};

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState(getInitialInventory);

    const saveToLocalStorage = debounce((items) => {
        try {
            localStorage.setItem('inventoryItems', JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }, 300);

    useEffect(() => {
        saveToLocalStorage(items);
    }, [items]);

    const addItem = (item) => {
        if (!item.name || item.price < 0 || item.quantity < 0) {
            throw new Error('Invalid item: name is required, price and quantity must be non-negative');
        }
        setItems((prev) => [
            ...prev,
            { ...item, id: uuidv4(), createdAt: Date.now() },
        ]);
    };

    const updateItem = (id, updatedItem) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...updatedItem, id } : item
            )
        );
    };

    const deleteItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to delete all items?')) {
            setItems([]);
        }
    };

    const getItemById = (id) => {
        return items.find((item) => item.id === id);
    };

    return (
        <InventoryContext.Provider
            value={{
                items,
                addItem,
                updateItem,
                deleteItem,
                clearAll,
                getItemById,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};