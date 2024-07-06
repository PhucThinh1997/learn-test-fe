// import React from 'react';
// import PropTypes from 'prop-types';
// import {Can} from 'context/Can';

// /**
//  * A wrapper Can ability to validate component's permission
//  */
// const WithAbility = (props) => {
//     const {
//         component,
//         ability,
//         ...rest
//     } = props;

//     if (!ability.subject) {
//         // eslint-disable-next-line
//         { React.createElement(component, Object.assign({}, rest)) }

//     }
//     return (
//         <Can I={ability.do} this={ability.subject}>
//             {React.createElement(component, Object.assign({}, rest))}
//         </Can>
//     )
// }

// WithAbility.propTypes = {
//     /**
//      * React component needs to validate ability permission
//      */
//     component: PropTypes.func.isRequired,
//     /**
//      * An ability [subject, do] object that uses by Can, to validate permission
//      */
//     ability: PropTypes.object
// }

// export default WithAbility;
