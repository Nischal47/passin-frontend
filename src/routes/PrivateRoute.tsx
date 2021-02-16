import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from "../store/interface/storeInterface"

interface PrivateRouteProps extends RouteProps {
    component: React.FunctionComponent<RouteProps>;
    name?: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const {component: Component, ...rest} = props;

    const {isAuthenticated} = useSelector((state:RootState) => state.authReducer);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={'/'}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
