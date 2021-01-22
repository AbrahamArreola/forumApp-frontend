import React from "react";
import { ForumApp } from "./components/ForumApp";

import {Provider} from 'react-redux'
import generateStore from './redux/store'

function App() {
    const store = generateStore()

    return(
        <Provider store={store}>
            <ForumApp />
        </Provider>
    )
}

export default App;
