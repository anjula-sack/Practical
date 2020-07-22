import React from 'react';
import './App.css';
import axios from 'axios';
import ShoppingItem from "./components/ShoppingItem";
import {Col, Container, Row} from "react-bootstrap";

class Home extends React.Component {
    items = [];
    size = 'all';

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            types: [],
        }
    }

    componentDidMount() {
        this.fetchItems();
    }

    fetchItems = () => {
        axios
            .get('https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments')
            .then((response) => {
                this.setState({items: response.data})
                this.items = response.data;
                let types = ['all'];
                this.items.map(item => {
                    if(!types.includes(item.details.type)){
                        types.push(item.details.type)
                    }
                })
                this.setState({ types: types})
            })
            .catch((error) => alert('something went wrong, unable to fetch items'))
    }

    onChangeSize = (event) => {
        this.size = event.target.value;
        this.filterItems();
    }

    onChangeType = (event) => {
        this.type = event.target.value;
        this.filterItems();
    }

    filterItems = () => {
        const filteredItems = this.items.filter(item => {
            return ((this.size === 'all' || item.details.size === this.size) &&
                (this.type === 'all' || item.details.type === this.type))
        });
        this.setState({items: filteredItems});
    }

    render() {
        return (
            <Container style={{ marginTop: 20 }}>
                <Row>
                <Col>
                    <span>Size</span>
                    <select name="size" onChange={this.onChangeSize}>
                        <option value="all">All</option>
                        <option value="xsmall">XS</option>
                        <option value="small">S</option>
                        <option value="large">L</option>
                    </select>
                </Col>
                <Col>
                    <span>Type</span>
                    <select name="type" onChange={this.onChangeType}>
                        {this.state.types.map((type,index) =>
                            <option key={index} value={type}>{type}</option>
                        )}
                    </select>
                </Col>
                </Row>
                <table style={{width: '100%'}}>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>Name</td>
                        <td>Prize</td>
                        <td>Size</td>
                        <td></td>
                    </tr>
                    {this.state.items.map((item, index) =>
                        <ShoppingItem key={index} item={item}/>
                    )}
                    </tbody>
                </table>
            </Container>
        );
    }

}

export default Home;
