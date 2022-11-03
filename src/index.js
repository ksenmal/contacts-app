import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from './routes/root.js';
import './index.css';
import ErrorPage from './routes/error-page';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as deleteAction } from './routes/delete';
import DetailIndex from './routes/detailIndex';

/*const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DetailIndex />
          }, {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          }, {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          }, {
            path: 'contacts/:contactId/delete',
            action: deleteAction,
            element: null,
            errorElement: <div>An error occured. Couldn't delete the contact</div>
          }
        ]
      }
    ]
  }
]);*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <DetailIndex />
      }, {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      }, {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      }, {
        path: 'contacts/:contactId/delete',
        action: deleteAction,
        element: null,
        errorElement: <div>An error occured. Couldn't delete the contact</div>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
