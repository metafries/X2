import React, { useEffect } from 'react'
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import { useStore } from '../../app/store/config';
import { observer } from 'mobx-react-lite';

function OAuth2RedirectHandler(props) {
    const { commonStore, accountStore } = useStore();

    useEffect(() => {
        accountStore.getUser().finally(() => commonStore.setLoading(false));
    }, [commonStore, accountStore]);    

    const getUrlParameter = (name) => {
        console.log('OAUTH2', props)

        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        console.log('NAME', name)

        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        console.log('REGEX', regex)

        var results = regex.exec(props.location.search);
        console.log('RESULTS', results)
        console.log('FINAL', results && decodeURIComponent(results[1].replace(/\+/g, ' ')))
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        return <Redirect to={{
            pathname: "/activities",
            state: { from: props.location }
        }}/>; 
    } else {
        return <Redirect to={{
            pathname: "/",
            state: { 
                from: props.location,
                error: error 
            }
        }}/>; 
    }
}

export default observer(OAuth2RedirectHandler)