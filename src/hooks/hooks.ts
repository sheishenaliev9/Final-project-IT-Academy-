import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDisptach>();
