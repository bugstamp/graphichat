import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';

import Grid from '@material-ui/core/Grid';

const NotFoundLayout = ({ children }) => (
  <Grid container spacing={0} justify="center">
    <Grid item xs={12} lg={10}>
      {children}
    </Grid>
  </Grid>
);

NotFoundLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default hot(module)(withRouter(NotFoundLayout));
