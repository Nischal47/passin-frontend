import React from 'react';
import {Switch, Route} from 'react-router-dom'
import routeList from "./routeList";
import PrivateRoute from "./PrivateRoute";

interface MainRoutePropsInterface {

}

const MainRoute:React.FC<MainRoutePropsInterface> = () => {
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