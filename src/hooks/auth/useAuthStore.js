import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api'
import { checking, login, logout, clearErrorMessage,
     resetProductosStore, 
     resetCategoriasStore} from '../../store/slices';

export const useAuthStore = () => {
  
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const startLogin = async({email,password}) => {
        
        dispatch(checking())

        try {
            const {data} = await canencioApi.post('/auth',{email,password});
            
            localStorage.setItem('token', data.token );
            dispatch( login({ name: data.name, uid: data.uid }) );

        } catch (error) {
            dispatch( logout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( logout() );

        try {
            const { data } = await canencioApi.get('auth/renew');
            localStorage.setItem('token', data.token );
            dispatch( login({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch( logout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(resetProductosStore());
        dispatch(resetCategoriasStore());
        dispatch(logout());
    }

    return {
        //propiedades
        status,
        user,
        errorMessage,

        //metodos
        startLogin,
        checkAuthToken,
        startLogout,
    }
}

