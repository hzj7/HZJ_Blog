import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from "./context/userContext.jsx";
import moment from 'moment'
// 汉化moment
import 'moment/dist/locale/zh-cn';
// 设置全局语言为中文
moment.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContextProvider>
            <App/>
        </UserContextProvider>
    </React.StrictMode>
)
