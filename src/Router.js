import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import restrictedZones from './Components/RestrictedZones'


class Router extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/restrictedZone" component={restrictedZones} />
        </BrowserRouter>
      </>
    )
  }
}

export default Router
