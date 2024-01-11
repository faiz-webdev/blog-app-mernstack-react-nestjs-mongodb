import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={8} autoHideDuration={10000} action={(snackbarId) => (
      <a href='#' onClick={() => closeSnackbar(snackbarId)}>Dismiss</a>
    )}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/*' element={<App />}></Route>
          </Routes>
        </Router>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
