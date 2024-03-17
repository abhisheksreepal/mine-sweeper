import React from 'react';

import RootStore from '../stores/root.store';

const rootStore = new RootStore();

 const StoreContext = React.createContext({
    rootStore
});

export default StoreContext;