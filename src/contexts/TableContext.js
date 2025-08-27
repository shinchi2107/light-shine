import { createContext, useContext, useState } from "react";
const TableContext = createContext(null);
function TableProvider() {
    const [idsEdit, setIdsEdit] = useState([]);
    const [idsDelete, setIdsDelete] = useState([]);
    return (
        <TableContext.Provider value={{ idsEdit, setIdsEdit, idsDelete, setIdsDelete }}></TableContext.Provider>
    )
}

function useTableContext() {
    const context = useContext(TableContext);
    if (typeof context === 'undefined') {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
}

export { TableProvider, useTableContext };

