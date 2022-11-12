import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { extendTheme } from '@mui/joy/styles'

declare module '@mui/joy/styles' {
    interface Palette {
        instagram: {
            primary: string
            secondary: string
        }
    }
}

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#e1306c',
        },

        background: {
            default: '#e4f0e2',
        },
        error: {
            main: red.A400,
        },
    },
})

extendTheme({
    colorSchemes: {
        light: {
            palette: {
                instagram: {
                    primary: '#e1306c',
                    secondary: '#ff6f91',
                },
            },
        },
    },
})

export default theme
