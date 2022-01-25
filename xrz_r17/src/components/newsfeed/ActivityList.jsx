import { Avatar, Card, CardHeader, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStore } from '../../app/store/config'
import HelpOutlineTwoToneIcon from '@material-ui/icons/HelpOutlineTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'whitesmoke',
        background: '#323232',
        marginBottom: '10px',
        borderRadius: 0,
        border: '1px solid #16161680',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        maxWidth: 'auto',
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));

function ActivityList() {
    const classes = useStyles();
    const { accountStore } = useStore();

    return (
        <React.Fragment>
            {
                accountStore.isLoggedIn
                    ?
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    src={accountStore.user.imageUrl || '/'}
                                    className={classes.avatar}
                                />
                            }
                            title={accountStore.user.name}
                            subheader={accountStore.user.email}
                        />
                    </Card>
                    :
                    <List style={{ color: '#afadaa' }}>
                        <ListItem style={{ overflowWrap: 'break-word' }}>
                            <ListItemIcon style={{ color: '#afadaa', minWidth: '36px' }}>
                                <HelpOutlineTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Click the icon on the top right corner to get started.'} />
                        </ListItem>
                    </List>
            }
        </React.Fragment>
    )
}

export default observer(ActivityList)