import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const QueryIcons = ({ changeQuery }) => (
  <div className="query-icons">
    <FlatButton label="Top" onClick={() => changeQuery('best')} />
    <FlatButton label="Show" onClick={() => changeQuery('show')} />
    <FlatButton label="Ask" onClick={() => changeQuery('ask')} />
    <FlatButton label="Jobs" onClick={() => changeQuery('jobs')} />
  </div>
);
QueryIcons.propTypes = {
  changeQuery: PropTypes.func.isRequired
};
export default QueryIcons;
