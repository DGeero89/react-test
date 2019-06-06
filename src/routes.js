import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Components
import App from "./components/App";
import Login from "./components/Login";
import Register from "./components/Register";
import Todos from "./components/Todos";

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<Route path="/todos" exact component={Todos} />
			<Route path="*" render={() => <p>Not Found</p>} />
		</Switch>
	</BrowserRouter>
);
export default Routes;
