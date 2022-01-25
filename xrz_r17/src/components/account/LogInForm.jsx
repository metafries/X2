import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import DialogContent from '@material-ui/core/DialogContent';
import { Button, CircularProgress, LinearProgress, withStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormikTextInput from '../utils/FormikTextInput';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import { useStore } from '../../app/store/config'
import { observer } from 'mobx-react-lite';
import { FACEBOOK_AUTH_URL } from '../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(4),
            width: '100%',
        },
    },
    appBar: {
        color: '#1e1e1f',
        background: '#ffff00',
        position: 'fixed',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function LogInForm({ location, history }) {

    const {
        accountStore: { register, login },
        commonStore: {
            loading, setLoading,
            openIdentityInputs, setOpenIdentityInputs,
        },
    } = useStore();

    const classes = useStyles();
    const progressClasses = makeStyles((theme) => ({
        root: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
        },
    }));

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let registerSchema = yup.object().shape({
        username: yup.string().required('Username is required.'),
        fullName: yup.string().required('Full Name is required.'),
        password: yup.string().required('Password is required.'),
        confirmPwd: yup.string().oneOf([yup.ref('password'), null], 'Password do not match.')
    })

    let loginSchema = yup.object().shape({
        username: yup.string().required('Username is required.'),
        password: yup.string().required('Password is required.'),
    })

    return (
        <Dialog
            fullScreen
            scroll='paper'
            open={openIdentityInputs}
            onClose={() => setOpenIdentityInputs(false)}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        style={{ float: 'right' }}
                        edge="start"
                        color="inherit"
                        onClick={() => setOpenIdentityInputs(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Tabs
                        indicatorColor="primary"
                        style={{ padding: 0 }}
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label='Login' {...a11yProps(0)} />
                        <Tab label='Register' {...a11yProps(1)} />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '68px' }} maxWidth='sm'>
                <DialogContent style={{ padding: 0 }}>
                    <TabPanel value={value} index={0}>
                        <Button
                            href={FACEBOOK_AUTH_URL}
                            startIcon={<FacebookIcon />}
                            type='submit'
                            style={{ marginTop: '32px', width: '100%', borderRadius: 0 }}
                            variant="outlined"
                            onClick={() => setLoading(true)}
                        >
                            Log in with facebook
                        </Button>
                        {loading && <LinearProgress className={progressClasses.root} />}
                        <hr class="hr-text" data-content="OR" />

                        <Formik
                            initialValues={{ username: '', password: '', error: null }}
                            validationSchema={loginSchema}
                            onSubmit={(v, { setErrors }) => login(v).catch(apiErr => {
                                setErrors(apiErr.response.data);
                            })}
                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form className={classes.root} autoComplete='off'>
                                    <FormikTextInput type='text' name='username' label='Username' />
                                    <FormikTextInput name='password' label='Password' type='password' />
                                    {
                                        errors.message &&
                                        <List style={{ margin: 0, color: 'red' }}>
                                            <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                                                    <ErrorOutlineIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={errors.message} />
                                            </ListItem>
                                        </List>
                                    }
                                    <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                                        {isSubmitting ? <CircularProgress size={20} /> : 'Log In'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                </DialogContent>
                <DialogContent style={{ padding: 0 }}>
                    <TabPanel value={value} index={1}>
                        <Formik
                            initialValues={{
                                username: '',
                                fullName: '',
                                password: '',
                                confirmPwd: '',
                            }}
                            validationSchema={registerSchema}
                            onSubmit={(v, { setErrors }) => register(v).catch(apiErr => {
                                setErrors(apiErr.response.data.validationErrors)
                            })}
                        >
                            {({ handleSubmit, isSubmitting, errors }) => (
                                <Form className={classes.root} autoComplete='off'>
                                    <FormikTextInput type='text' name='username' label='Username' />
                                    <FormikTextInput type='text' name='fullName' label='Full Name' />
                                    <FormikTextInput type='password' name='password' label='Password' />
                                    <FormikTextInput type='password' name='confirmPwd' label='Confirm Password' />
                                    <Button type='submit' style={{ borderRadius: 0 }} variant="outlined">
                                        {isSubmitting ? <CircularProgress size={20} /> : 'Sign up'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </TabPanel>
                </DialogContent>
            </Container>
        </Dialog>
    )
}

export default observer(LogInForm)