import React from 'react';
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, auth, ...rest}) =>{
    <Route
        {...rest}
        render={props=>{
            return <Component {...props} />;
        }}
    />
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);