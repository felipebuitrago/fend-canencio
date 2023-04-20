

import { Outlet } from 'react-router-dom';
import { InventarioLayout } from '../layout/InventarioLayout';

export const InventarioView = () => {
	return (
		<InventarioLayout>


			<Outlet />

		</InventarioLayout>
	)
}