import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.jsx';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<NextUIProvider>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</NextUIProvider>
	</React.StrictMode>
);
