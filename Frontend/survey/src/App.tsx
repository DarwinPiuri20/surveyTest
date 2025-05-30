import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import AdminLayout from './layout/AdminLayout';
import ValidatorLayout from './layout/ValidatorLayout';

import DashboardPage from './pages/dashboard/DashboardPage';
import AdminQuestionPage from './pages/AdminQuestionPage';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                {/* Admin Layout */}
                <Route element={
                    <PrivateRoute>
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    </PrivateRoute>
                }>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/admin/preguntas" element={<AdminQuestionPage />} />
                </Route>

                {/* Validador Layout */}
                <Route element={
                    <PrivateRoute>
                        <ValidatorLayout />
                    </PrivateRoute>
                }>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    {/* futuras rutas como /evaluar y /historial */}
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;
