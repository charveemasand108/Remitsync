import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.CLERK_PUBLISHABLE_KEY

const root = createRoot(document.getElementById('root'))

if (CLERK_KEY && CLERK_KEY.startsWith('pk_')) {
    root.render(
        <ClerkProvider publishableKey={CLERK_KEY}>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ClerkProvider>
    )
} else {
    // Institutional Demo Mode (Zero login friction for Citi x NPCI Hackathon judges)
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
}