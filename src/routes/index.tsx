import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import routeList from "./routeList";
import PrivateRoute from "./PrivateRoute";
import {useDispatch} from "react-redux";
import * as actions from "../store/action";

interface MainRoutePropsInterface {

}

const MainRoute:React.FC<MainRoutePropsInterface> = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.checkAuthentication())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Switch>
            {
                routeList.map((route, key) => (
                    !route.isAuth
                        ? <Route
                            path={`${route.path}`}
                            name={route.name}
                            component={route.component}
                            exact={route.exact}
                            key={key}
                        />
                        : <PrivateRoute
                            path={`${route.path}`}
                            name={route.name}
                            component={route.component}
                            exact={route.exact}
                            key={key}
                        />
                ))
            }
        </Switch>
    );
};

export default MainRoute;