import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';

// Custom hook for typed selectors
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 