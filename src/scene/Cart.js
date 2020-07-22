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
        let updatedItems = [...this.state.items]
        console.log(updatedItems);
        this.setState({items: updatedItems.splice(index,1)})
    }

    render() {
        return (
            <>
                <h1>Cart</h1>
                <table style={{width: '100%'}}>
                    <tbody>
                    {this.state.items.map((item,index) =>
                        <tr key={index}>
                            <td><img src={item.details.image} alt="product" width={100}/></td>
                            <td>{item.name}</td>
                            <td>{item.details.price}</td>
                            <td>{item.details.size}</td>
                            <td><Button variant="danger" onClick={() => {this.handleDelete(index)}}>Remove</Button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Cart;
