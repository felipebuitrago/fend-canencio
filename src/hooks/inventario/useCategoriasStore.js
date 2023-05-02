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
    }
    
    const startReadCategorias = async() => {

        const categoriasDB = await canencioApi.get('/categorias');
        dispatch(addCategoriasStore(categoriasDB.data.result));
    }

    const startBuscarCategoria = (id) => {
        
        dispatch(buscarCategoriaStore({id}));
    }

    const startUpdateCategoria = async(id, data) => {

        const {name,description} = data;
        await canencioApi.put(`/categorias/update/${id}`,{name,description});

        dispatch(updateCategoriaStore({id, data}));
    }
    
    const startDeleteCategoria = async(id) => {

        await canencioApi.delete(`/categorias/delete/${id}`);

        dispatch(deleteCategoriaStore({id}));
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

