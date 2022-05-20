import React from 'react';

const ItemsContext = React.createContext({
	data : [],
    addData: () => {},
    removeData: () => {},
    editData: () => {},
});

export default ItemsContext;
