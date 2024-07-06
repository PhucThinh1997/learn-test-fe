import React from 'react';
import PropTypes from 'prop-types';
import Indicator from '../indicator/Indicator';

/**
 * A simple wrapper indicator component which supports i18n loading message
 * Causion: That is using React.createElement
 * @author
 */
const WithIndicator = (props) => {
  const { component, loading, delay, ...rest } = props;

  return (
    <Indicator loading={loading} delay={delay} tip={'Loading'}>
      {React.createElement(component, Object.assign({}, rest))}
    </Indicator>
  );
};

WithIndicator.propTypes = {
  /**
   * React component
   */
  component: PropTypes.func.isRequired,
  /**
   * spinner loading state
   */
  loading: PropTypes.bool,
  /**
   * delay milliseconds before showing spinner
   */
  delay: PropTypes.number,
};

export default WithIndicator;
