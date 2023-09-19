import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

function PrivateRoute({
  component: Component, allowedRoles, loading, approved, ...rest
}) {
  const store = useSelector((state) => state.auth.value);

  return (
    <Route
      {...rest}
      render={(props) => {
        /* User must be authenticated and be part of the allowedRules to access
      a PrivateRoute */
        if ((loading || approved === null) && store.getState().authenticated) {
          return (
            <Grid
              container
              spacing={0}
              align="center"
              justify="center"
              direction="column"
              style={{ height: '100vh' }}
            >
              <Grid item>
                <CircularProgress align="center" />
              </Grid>
            </Grid>
          );
        }
        if (store.isLoggedIn && approved
        && allowedRoles.includes(store.getState().userData.user.fields['user type'])) {
          return <Component {...props} />;
        }
        if (!store.isLoggedIn && allowedRoles.includes('')) {
          return <Component {...props} />;
        }
        /* If user is authenticated and not part of the allowedRules, they are
      taken to their home page */
        if (store.getState().authenticated) {
          return <Redirect to="/" />;
        }
        /* Redirects to sign in page because user is not logged in */
        return <Redirect to="/signin" />;
      }}
    />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  approvalPermissions: PropTypes.bool.isRequired,
};
