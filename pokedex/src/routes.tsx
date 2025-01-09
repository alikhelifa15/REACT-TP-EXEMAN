import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import PokemonDetails from './components/PokemonDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetails />,
  },
]);