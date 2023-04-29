import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createCategoriaStore,
        addCategoriasStore,
        updateCategoriaStore,
        deleteCategoriaStore } from '../../store/slices';

export const useCategoriasStore = () => {
  
    const dispatch = useDispatch();
    const { categorias } = useSelector(state => state.categorias);

    const startCreateCategoria = () => {
        //TODO: create OPERATION

        dispatch(createCategoriaStore());
    }
    
    const startReadCategorias = async() => {

        const categoriasDB = await canencioApi.get('/categorias');
        dispatch(addCategoriasStore(categoriasDB.data.result));
    }

    const startUpdateCategoria = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updateCategoriaStore({id, data}));
    }
    
    const startDeleteCategoria = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deleteCategoriaStore({id}));
    }


    return {
        //propiedades
        categorias,
    
        //metodos
        startCreateCategoria,
        startReadCategorias,
        startUpdateCategoria,
        startDeleteCategoria
    }
}

