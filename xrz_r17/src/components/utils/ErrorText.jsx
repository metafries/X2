import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function ErrorText({errors}) {
    return (
        <List style={{ color: 'red' }}>
            {errors.map((err, idx) => (
                <ListItem style={{padding: 0}} key={idx}>
                    <ListItemIcon style={{ color: 'red', minWidth: '36px' }}>
                        <ErrorOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={err} />
                </ListItem>
            ))}
        </List>
    )
}
