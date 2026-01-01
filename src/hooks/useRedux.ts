import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

/**
 * Typed hooks for Redux.
 */
export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;


