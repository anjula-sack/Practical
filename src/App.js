import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Cart from "./scene/Cart";
import Home from "./Home";
import {Container} from "react-bootstrap";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Container style={{ marginTop: 20 }}>
                    <Link to="/">Home</Link>{' '}
                    <Link to="/cart">Cart</Link>
                    <Switch>
                        <Route path="/cart">
                            <Cart/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default App;
