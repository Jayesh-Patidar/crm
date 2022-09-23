import { useDispatch, useSelector } from 'react-redux';
import {
    selectSnackbar,
    setSnackbar,
    Snackbar,
    SnackbarAction,
} from '../ducks';

type UseSnackbarReturn = {
    snackbar: Snackbar;
    toggleSnackbar: (snackbar?: SnackbarAction['payload']) => void;
};

export const useSnackbar = (): UseSnackbarReturn => {
    const dispatch = useDispatch();
    const snackbar = useSelector(selectSnackbar);

    const toggleSnackbar = (snackbar?: SnackbarAction['payload']) => {
        dispatch(setSnackbar(snackbar));
    };

    return { snackbar, toggleSnackbar };
};
