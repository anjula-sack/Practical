import React from "react";
import {Button} from "react-bootstrap";

class ShoppingItem extends React.Component{

    addItemToCart = (item) => {
        let items = JSON.parse(localStorage.getItem('items'));
        if(items === null){
            items = [item];
        } else {
            let isAlreadyIncluded = false;
            for(let i = 0; i < items.length; i++){
                if(items[i].id === item.id){
                    isAlreadyIncluded = true;
                    break;
                }
            }

            if(!isAlreadyIncluded){
                item.qty = 1;
                items.push(item);
            }
        }
        localStorage.setItem('items', JSON.stringify(items));
        alert('Item Added');
    }

    render() {
        const { item } = this.props;
        return(
            <tr>
                <td><img src={item.details.image} alt="product" width={100}/></td>
                <td>{item.name}</td>
                <td>{item.details.price}</td>
                <td>{item.details.size}</td>
                <td><Button variant="primary" onClick={() => {this.addItemToCart(item)}}>Add to Cart</Button></td>
            </tr>

        )
    }
}

export default ShoppingItem;
