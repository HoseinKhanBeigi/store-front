import { styled } from '@mui/material';
import { makeStyles } from '@mui/styles';


interface PropStyle {
    scaleX: number,
    translateY: number
}

export const ContainerHeadline = styled("h2")(({ theme }) => ({
    fontSize: '5vmin'
}));

export const useStyles = makeStyles(() => ({
    warrper: {
        margin: 0,
        padding: 0,
        height: '100vh',
        color: 'white',
        background: 'black',
        fontFamily: '"Cormorant Garamond", serif',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 'clamp(1rem, 5vw, 5rem)',
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: '0.5em',
        marginRight: '-0.5em',
        color: 'hsl(0, 0, 80%)',
        width: '90vw',
        maxWidth: '1200px'
    },
    section: {
        height: '100%',
        width: '100%',
        top: 0,
        position: 'fixed',
        visibility: 'hidden'
    },

    outer: {
        width: '100%',
        height: '100%',
        overflowY: 'hidden'
    },
    inner: {
        width: '100%',
        height: '100%',
        overflowY: 'hidden'
    },
    bg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

}));
