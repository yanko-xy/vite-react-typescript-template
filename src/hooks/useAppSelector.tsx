import type { RootState } from '@/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// import { useSelector } from 'react-redux'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
