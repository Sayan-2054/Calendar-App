import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Calendar from './components/Calender';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Sidebar />
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;