import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import routes from "./routes";
import withTracker from "./withTracker";
import Auth from "./container/auth/authlogin";
import AuthSignup from "./container/auth/authsignup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import NewsPosts from "./views/NewsPosts";

import { DefaultLayout } from "./layouts";
import * as actions from './store/actions/index';
import TrendingNews from "./views/trendingnews"



class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  
  render () {
    let routes = (
      <Switch>
        <Route path="/auth/login" component={Auth} />
        <Route path="/auth/signup" component={AuthSignup} />
        <Route path="/" exact component={NewsPosts} />
        <Route path="/trending-news" component={TrendingNews} />
}
        <Redirect to="/" />
      </Switch>
    );


    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          {/* <Route path="/checkout" component={Checkout} /> */}
          {/* <Route path="/orders" component={Orders} /> */}
          {/* <Route path="/logout" component={Logout} /> */}
          <Route path="/" exact component={NewsPosts} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <DefaultLayout>
          {routes}
        </DefaultLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );

// export default () => (
//   <Router basename={process.env.REACT_APP_BASENAME || ""}>
//     <div>
//       {routes.map((route, index) => {
//         return (
//           <Route
//             key={index}
//             path={route.path}
//             exact={route.exact}
//             component={withTracker(props => {
//               return (
//                 <route.layout {...props}>
//                   <route.component {...props} />
//                 </route.layout>
//               );
//             })}
//           />
//         );
//       })}
//     </div>
//   </Router>
// );
