import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const QueryIcons = ({ makeQuery }) => (
  <div className="query-icons">
    <FlatButton label="Top" onClick={() => makeQuery('topstories')} />
    <FlatButton label="Ask" onClick={() => makeQuery('askstories')} />
    <FlatButton label="Show" onClick={() => makeQuery('showstories')} />
    <FlatButton label="Jobs" onClick={() => makeQuery('jobstories')} />
  </div>
);
QueryIcons.propTypes = {
  makeQuery: PropTypes.func.isRequired
};
export default QueryIcons;
