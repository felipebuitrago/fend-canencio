import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from '../app/auth/routes/AuthRouter';
import { InventarioRouter } from "../app/inventario/routes/InventarioRouter";
import { useAuthStore } from "../hooks";
import { CircularProgress } from '@mui/material';
  
export const AppRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

     useEffect(() => {
         checkAuthToken();
    }, [])
    
    if ( status === 'checking' ) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        )
    }

    else if( status === 'not-authenticated'){
        return ( 
            <Routes>
                <Route path="/*" element= { <AuthRouter /> } /> 
                <Route path="/*/*" element={ <Navigate to="/*" /> }  />
            </Routes>
        )
    }else{
        return ( 
            <Routes>
                <Route path="/*" element= { <InventarioRouter /> } />
            </Routes>
        )
    }

    

    // return( 

    //     <Routes>
    //         {
    //             ( status === 'not-authenticated')  
    //                 ?( <Route path="/auth/*" element= { <AuthRouter /> } /> )
    //                 :(<Route path="/*" element= { <InventarioRouter /> } />)
    //         }
    //         <Route path="/*" element={ <Navigate to="/auth" /> }  />

    //     </Routes>
    //)

// <Routes>
// {
//     ( status === 'not-authenticated')  
//         ?(
//             <>
//                 <Route path="/auth/*" element= { <AuthRouter /> } />
//                 <Route path="/*" element={ <Navigate to="/auth" /> }  />
//             </>
//         )
//         :(
//             <>
//                 <Route path="/inventario/*" element= { <InventarioRouter /> } />

//                 <Route path="/*" element={ <Navigate to="/" /> }  />
//             </>
//         )
// }
// </Routes>
    
}
