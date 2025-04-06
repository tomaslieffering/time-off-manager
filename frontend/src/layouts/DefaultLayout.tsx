import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
	return (
		<>
			<Header />
			<div className='container mx-auto px-4'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}