import { styled } from '@mui/material';
import { makeStyles } from '@mui/styles';


interface PropStyle {
    scaleX: number,
    translateY: number
}

export const ContainerHeadline = styled("h2")(({ theme }) => ({
    fontSize: '5vmin'
}));

export const Wrapper = styled("div")(({ theme }) => ({
    background: 'black',
    fontFamily: '"IBM Plex Sans", sans-serif',
    backgroundColor: theme.palette.primary.main
}));



export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        color: 'white',
        textAlign: 'center'
    },
    heroImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '160%',
        objectFit: 'cover'
    },

    heroInner: {
        display: 'flex',
        position: 'relative',
        width: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
            content: '""',
            display: 'block',
            paddingBottom: 'calc(100% / (16 / 9))'
        }
    },
    heroContent: {
        position: 'absolute',
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    heroHeadLine: {
        position: 'relative',
        display: 'inline-block',
        fontSize: '10vmin',
        overflow: 'hidden',
        marginTop: 'calc(1.5vmin * -1)',
        padding: '1.5vmin',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 'calc(100% - 1.5vmin)',
            left: 0,
            backgroundColor: 'white',
            width: '100%',
            height: '1.5vmin',
            transform: (props: PropStyle) => `scaleX(${props.scaleX})`,
            transition: 'transform 400ms calc(400ms / 2) cubic-bezier(0.25, 1, 0.5, 1)'
        }
    },

    title: {
        display: 'block',
        transform: (props: PropStyle) => `translateY(${props.translateY}%)`,
        transition: 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)'
    }
}));