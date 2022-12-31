import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import { UserRole } from 'constants/defaultValues';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Home = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './home')
);
const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './admin')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);

const App = ({ match, currentUser }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
            <Route
              path={`${match.url}/home`}
              render={(props) => <Home {...props} />}
            />
            {currentUser?.role === UserRole.Admin && (
              <Route
                path={`${match.url}/admin`}
                render={(props) => <Admin {...props} />}
              />
            )}

            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ authUser, menu }) => {
  const { currentUser } = authUser;
  const { containerClassnames } = menu;
  return { containerClassnames, currentUser };
};

export default withRouter(connect(mapStateToProps, {})(App));
