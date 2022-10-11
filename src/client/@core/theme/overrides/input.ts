// ** MUI Imports
import { Theme } from '@mui/material/styles';

const input = (theme: Theme) => {
    return {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.secondary,
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`,
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`,
                    },
                    '&.Mui-disabled:before': {
                        borderBottom: `1px solid ${theme.palette.text.disabled}`,
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: `rgba(${theme.palette.customColors.main}, 0.04)`,
                    '&:hover:not(.Mui-disabled)': {
                        backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`,
                    },
                    '&:before': {
                        borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`,
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`,
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: `rgba(${theme.palette.customColors.main}, 0.32)`,
                        },
                    '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.error.main,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`,
                    },
                    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.text.disabled,
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                },
            },
        },
    };
};

export default input;
