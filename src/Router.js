import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';


class Router extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </>
    )
  }
}

export default Router
