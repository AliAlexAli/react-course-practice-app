import React from 'react';

const ItemsContext = React.createContext({
	data : [],
    addData: () => {},
    removeData: () => {},
});

export default ItemsContext;
