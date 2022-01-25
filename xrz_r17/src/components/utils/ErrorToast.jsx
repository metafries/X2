import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';

export default function Error({msg}) {
    return (
        <List style={{ padding: 0 }}>
            <ListItem style={{ padding: 0 }}>
                <ListItemIcon style={{ minWidth: '36px' }}>
                    <ErrorTwoToneIcon/>
                </ListItemIcon>
                <ListItemText style={{ margin: 0, padding: 0 }} primary={msg} />
            </ListItem>
        </List>
    )
}
