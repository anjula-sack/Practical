import React from "react";
import {Button} from "react-bootstrap";

class Cart extends React.Component {
    constructor(props) {
        super(props);
        let items = JSON.parse(localStorage.getItem('items'));
        if (items == null) {
            items = []
        }
        this.state = {
            items: items,
        }
    }

    handleDelete = (index) => {
        let updatedItems = [...this.state.items];
        updatedItems.splice(index,1);
        this.setState({items: updatedItems})
        localStorage.setItem('items', JSON.stringify(updatedItems));
    }

    changeQty = (index, value) => {
        let items = [...this.state.items];
        items[index].qty = value
        this.setState({items: items})
        localStorage.setItem('items', JSON.stringify(items));
    }

    render() {
        let total = 0;
        this.state.items.forEach( item => {
            total += item.qty * item.details.price;
        })
        return (
            <>
                <h1>Cart</h1>
                <table style={{width: '100%'}}>
                    <tbody>
                    {this.state.items.map((item, index) =>
                        <tr key={item.id}>
                            <td><img src={item.details.image} alt="product" width={100}/></td>
                            <td>{item.name}</td>
                            <td>{item.details.price}</td>
                            <td>{item.details.size}</td>
                            <td><input type="number" value={item.qty} onChange={(e) => {
                                this.changeQty(index,e.target.value)
                            }}/></td>
                            <td><Button variant="danger" onClick={() => {this.handleDelete(index)}}>Remove</Button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Total is = {total.toFixed(2)}</h2>
            </>
        )
    }
}

export default Cart;
