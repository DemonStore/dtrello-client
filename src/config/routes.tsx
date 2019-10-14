import * as React from 'react';
import { Redirect } from 'react-router';

import Login from '../pages/auth/Login';
import Logout from '../pages/auth/Logout';
import NotFound from '../pages/public/NotFound';
import TasksList from '../pages/tasks/TasksList';
import { isAuthorized } from '../service/auth';

const routes = [
    {
        path: '/',
        exact: true,
        render: () => {
            return <Redirect to="/tasks" />;
        },
    },
    {
        path: '/tasks/:taskId?',
        render: () => {
            if (!isAuthorized()) {
                return <Redirect to="/login" />;
            } else {
                return <TasksList/>
            }
        }
    },
    {
        path: '/login',
        render: () => {
            if (!isAuthorized()) {
                return <Login/>
            } else {
                return <Redirect to="/" />;
            }
        }
    },
    {
        path: '/logout',
        component: Logout
    },
    {
        component: NotFound,
    },
];

export default routes;
