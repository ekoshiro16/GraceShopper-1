import React from 'react'
import { Connect, Link } from 'react-router-dom'
// import { AllProducts } from './all-products';
import { fetchCart, removeItemFromCart, changeStatus } from '../store/cart'

export class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          quantity: 1,
          subTotal:0
        }
        this.changeQuantity = this.changeQuantity.bind(this)
        this.updateSubtotal = this.updateSubtotal.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
    }
    componentDidMount() {
      this.props.removeItemFromCart(this.products.items.id)
      this.props.updateStatus(status)
    }

    // when user changes quantity input, this.state.quantity updates as well
    changeQuantity(event) {
      this.setState = {
        quantity: event.target.value
      }
    }

    // when each product is mapped and rendered, product price should add to subTotal
    updateSubtotal(event) {
      this.setSate = {
        subTotal: this.state.subTotal + event.target.value
      }
    }

    // when user clicks on 'proceed to check out', we send a new status to the updateStatus thunk, which then triggers an axios.put request to the cart table
    updateStatus(event) {
      this.props.updateStatus({
        status: 'COMPLETED'
      })
    }

    render() {
      let tax = this.state.subTotal* 0.9
      let totalPrice = this.state.subTotal + tax
      return (<div className='cart'>
        <div id='cart-view'>
          {this.products.items.map(product => {
            return (
              <div className='single-cart-product' key={product.id}>
                  <Link to={`/products/${product.id}`}>
                      <div className='single-product'>
                        <img src={product.imageURL}></img>
                      </div>
                  </Link>
                  <div className='single-product-info'>
                      <div className='single-product-name'>{product.name}</div>
                      <div className='single-product-description'>{product.description}</div>
                      <div className='single-product-itemsInStock'>{product.itemsInStock}</div>
                      <div className='single-product-price' onRender = {this.updateSubtotal}>{product.price}</div>
                  </div>
                  <div className='remove-item-button'>
                    <button type='submit' onSubmit={this.props.removeItemFromCart(product.id)}>Remove Item</button>
                  </div>
                  <div className='update-quantity-button'>
                    <label className='itemQuantity'>Quantity: {this.state.quantity}</label>
                    <input type='number' onChange={this.changeQuantity}/>
                  </div>
              </div>
            )
          })}
          <div className='cart-subtotal'>
          {this.state.subTotal}
          </div>
        </div>
        <div className='cart-summary'>
          <div className='summary-title'>Summary</div>
          <div className='summary-subtotal'>{this.state.subTotal}</div>
          <div className='summary-tax'>{tax}</div>
          <div className='summary-total-price'>{totalPrice}</div>
        </div>
        <div className='checkout'>
          <Link className='checkout-button' onClick= {this.updateStatus}>Proceed to Check Out</Link>
        </div>
      </div>
    )
  }
}

// remember to add route and component that redirects to payment page!!!

const mapState = state => {
  return {
    products: state
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    removeItemFromCart: (id) => dispatch(removeItemFromCart(id)),
    changeStatus: (status) => dispatch(changeStatus(status))
  }
}

export default Connect(mapState, mapDispatch)(Cart)