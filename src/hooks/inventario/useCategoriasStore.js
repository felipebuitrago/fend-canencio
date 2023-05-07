import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createCategoriaStore,
        addCategoriasStore,
        buscarCategoriaStore,
        updateCategoriaStore,
        deleteCategoriaStore } from '../../store/slices';

export const useCategoriasStore = () => {
  
    const dispatch = useDispatch();
    const { categorias, categoriaSeleccionada } = useSelector(state => state.categorias);

    const startCreateCategoria = async(name, description) => {

        const result = await canencioApi.post('/categorias/new',{name,description});

        dispatch(createCategoriaStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startReadCategorias = async() => {

        const result = await canencioApi.get('/categorias');
        dispatch(addCategoriasStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }

    const startBuscarCategoria = (id) => {
        
        dispatch(buscarCategoriaStore({id}));
    }

    const startUpdateCategoria = async(id, data) => {

        const {name,description} = data;
        const result = await canencioApi.put(`/categorias/update/${id}`,{name,description});

        dispatch(updateCategoriaStore({id, data}));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startDeleteCategoria = async(id) => {

        const result = await canencioApi.delete(`/categorias/delete/${id}`);

        dispatch(deleteCategoriaStore({id}));
        localStorage.setItem('token', result.data.newToken);
    }


    return {
        //propiedades
        categorias,
        categoriaSeleccionada,
    
        //metodos
        startCreateCategoria,
        startReadCategorias,
        startBuscarCategoria,
        startUpdateCategoria,
        startDeleteCategoria
    }
}

