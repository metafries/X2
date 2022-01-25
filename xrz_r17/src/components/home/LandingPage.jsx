import React from 'react'
import Container from '@material-ui/core/Container';
import { Typography, withStyles } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const EnterButton = withStyles((theme) => ({
    root: {
        border: '1px solid #16161680',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        color: '#afadaa',
        backgroundColor: 'transparent',
        marginTop: '16px',
        borderRadius: 0,
    },
}))(Button);

const logo = { height: '20px', width: 'auto' };

export default function LandingPage() {
    return (
        <Container
            maxWidth='xs'
            style={{
                margin: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img alt='metaphy' style={logo} src='/assets/xraze.png' />
            <Typography variant='h5' style={{ color: 'whitesmoke' }}>
                Gather up in no time!
            </Typography>
            <LinearProgress />
            <EnterButton
                size="small"
                component={Link}
                to='/activities'
            > 
                click to enter 
            </EnterButton>
        </Container>
    )
}
