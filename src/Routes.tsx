import { Switch, Route, RouteProps } from 'react-router-dom';
import { User } from './components/user/User';
import { Task } from './components/task/Task';
import { Project } from './components/project/Project';
import { useAppSelector } from './redux/hooks';
import { userSelector } from './redux/slice/userSlice';
import { ROLES } from './components/constants';

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  isAllowed: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAllowed, ...rest }) => {
  // Logic to check if user is authenticated, usually from a context or state

  return <Route {...rest} render={(props) => (isAllowed ? <Component {...props} /> : <div> Not found</div>)} />;
};

export default function Routes() {
  const { currentUser } = useAppSelector(userSelector);
  const roles = currentUser?.role || [];
  return (
    <Switch>
      <Route path="/" exact>
        <User />
      </Route>
      <PrivateRoute
        exact
        path="/user"
        component={User}
        isAllowed={roles.some((role) => new Set([ROLES.EDIT_USERS, ROLES.VIEW_USERS, ROLES.DETELE_USERS]).has(role))}
      />
      <PrivateRoute
        exact
        path="/task"
        component={Task}
        isAllowed={roles.some((role) => new Set([ROLES.EDIT_TASKS, ROLES.VIEW_TASKS, ROLES.DELETE_TASKS]).has(role))}
      />
      <PrivateRoute
        exact
        path="/project"
        component={Project}
        isAllowed={roles.some((role) =>
          new Set([ROLES.EDIT_PROJECTS, ROLES.VIEW_PROJECTS, ROLES.RUN_PROJECTS]).has(role),
        )}
      />

      <Route>
        <div> Not found</div>
      </Route>
    </Switch>
  );
}
