declare module '@mui/material' {
    interface Palette {
        customColors: {
            main: string;
            tableHeaderBg: string;
            primaryGradient: string;
        };
    }

    interface PaletteOptions {
        customColors?: {
            main?: string;
            tableHeaderBg?: string;
            primaryGradient?: string;
        };
    }
}

export {};
