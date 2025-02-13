import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

// Custom hooks for TypeScript compatibility
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector);
