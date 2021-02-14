import React, {Dispatch, useEffect} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import * as actions from '../store/action'
import {ToasterStateInterface} from '../interfaces';

interface PrivateRouteProps extends RouteProps {
    component: React.FunctionComponent<RouteProps>;
    name?: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const {component: Component, ...rest} = props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isLoggedIn = !!localStorage.getItem('user');
    const openToaster = () => {
        const toasterState: ToasterStateInterface = {
            appear: true,
            title: "error",
            name: "Authentication Error",
            message: "You have to authenticate before proceedings "
        }
        dispatch(actions.setToasterState(toasterState))
    }
    useEffect(() => {
        !isLoggedIn && openToaster()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const dispatch = useDispatch<Dispatch<any>>()
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={'/login'}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
