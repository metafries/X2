import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from '../../components/home/LandingPage';
import { Container } from '@material-ui/core';
import ActivityList from '../../components/newsfeed/ActivityList';
import TopBar from '../../components/menu/TopBar';
import OAuth2RedirectHandler from '../../components/security/OAuth2RedirectHandler';
import { useStore } from '../store/config';
import { observer } from 'mobx-react-lite';

const custom = createTheme({
  palette: {
    primary: {
      main: '#2b2c2d',
    },
    text: {
      secondary: "#afadaa"
    }
  },
  typography: {
    h6: {
      fontSize: '1rem',
    },
    fontFamily: 'Oswald, sans-serif'
  },
});

function App() {
  const { commonStore, accountStore } = useStore();

  useEffect(() => {
    accountStore.getUser().finally(() => commonStore.setAppLoaded());
  }, [commonStore, accountStore]);

  if (!commonStore.appLoaded) return <MuiThemeProvider theme={custom}><LandingPage/></MuiThemeProvider>

  return (
    <MuiThemeProvider theme={custom}>
      <CssBaseline />
      <Route exact path='/' component={LandingPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <React.Fragment>
            <TopBar />
            <Container style={{ paddingLeft: 0, paddingRight: 0 }} maxWidth='sm'>
              <Switch>
                <Route exact path='/activities' component={ActivityList} />
                <Route path='/oauth2/redirect' component={OAuth2RedirectHandler} />
              </Switch>
            </Container>
          </React.Fragment>
        )}
      />
    </MuiThemeProvider>
  )
}

export default observer(App);