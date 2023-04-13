import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from '../app/auth/routes/AuthRouter';
import { InventarioRouter } from "../app/inventario/routes/InventarioRouter";

export const AppRouter = () => {

    
    return(

        <Routes>

            {/* Auth - Login - Recuperar Contraseña ROUTE*/}
            <Route path="/auth/*" element= { <AuthRouter /> } />

            {/* App Inventario ROUTE*/}
            <Route path="/inventario/*" element= { <InventarioRouter /> } />

            {/* Redirección de cualquier otra ruta al Login */}
            <Route path="/*" element={ <Navigate to="/auth" /> }  />

        </Routes>
    )
}
