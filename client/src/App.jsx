import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import TransactionDetail from "./pages/TransactionDetail";
import DrunixNetwork from "./pages/DrunixNetwork";
import Reconciliation from "./pages/Reconciliation";
import CorridorsView from "./pages/CorridorsView";
import IntegrationHub from "./pages/IntegrationHub";

const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#0f172a",
                        color: "#f8fafc",
                        border: "1px solid #334155",
                        fontSize: "12px",
                        fontFamily: "monospace"
                    }
                }}
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="transaction/:id" element={<TransactionDetail />} />
                    <Route path="transaction" element={<Navigate to="/transaction/RSX-928173" replace />} />
                    <Route path="drunix" element={<DrunixNetwork />} />
                    <Route path="reconciliation" element={<Reconciliation />} />
                    <Route path="corridors" element={<CorridorsView />} />
                    <Route path="integration" element={<IntegrationHub />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
