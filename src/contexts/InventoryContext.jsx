import React, { createContext, useContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

const getInitialInventory = () => {
    const stored = localStorage.getItem("inventoryItems");
    return stored ? JSON.parse(stored) : [];
};

export const InventoryProvider = ({ children }) => {
    const [items, setItems] = useState(getInitialInventory);

    useEffect(() => {
        localStorage.setItem("inventoryItems", JSON.stringify(items));
    }, [items]);

    const addItem = (item) => {
        const timestamp = Date.now();
        setItems((prev) => [
            ...prev,
            { ...item, id: timestamp.toString(), createdAt: timestamp },
        ]);
    };

    const updateItem = (id, updatedItem) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
        );
    };

    const editItem = (updatedItem) => {
        setItems((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const deleteItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearAll = () => {
        setItems([]);
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
                editItem,
                deleteItem,
                clearAll,
                getItemById
            }}
        >
            {children}
        </InventoryContext.Provider>
    );
};
