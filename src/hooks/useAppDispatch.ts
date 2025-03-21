import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

// Custom hook for typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>(); 