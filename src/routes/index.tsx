import { createBrowserRouter } from 'react-router-dom';
import BooksList from '../pages/BooksList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <BooksList />,
	},
]);

export default router;
