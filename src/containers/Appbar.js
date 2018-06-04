import React from 'react';
import { AppBar } from 'material-ui';
import { Link } from 'react-router-dom';

const Appbar = () => (
  <AppBar
    id="appbar"
    title={<Link to="/"> HN Reader </Link>}
    showMenuIconButton={false}
  />
);

export default Appbar;
