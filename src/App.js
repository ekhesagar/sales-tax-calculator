import React from 'react';
import Form from './components/Form';
import Receipt from './components/Receipt';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count: 0,
      type: '',
      product: '',
      price: 0,
      items: [],
      totalTax: 0,
      total: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value
  })
}

handleSubmit(e) {
  e.preventDefault();
  const taxExempted = ['book', 'headache pills', 'chocolates'];

  let total, totalTax
  let price = this.state.price*this.state.count;
  let product = this.state.product;

  if(this.state.type === 'imported'){
    if(taxExempted.includes(product)) price = price+ price*(0.05)
    else price = price + price*(0.15)
  }else if(!taxExempted.includes(product) && this.state.type !== 'imported') price = price + price * 0.1

  total = this.state.total + price;
  totalTax = (price - this.state.price) + this.state.totalTax;

  let item = {
    count: Number(this.state.count),
    type: this.state.type,
    product: this.state.product,
    totalPrice: Number(price),
    price: Number(this.state.price)
  }

  let check = false;
  let items = this.state.items;

  items = items.map((element) => {
    if(element.product === this.state.product && element.type === this.state.type){
      element.count = element.count + Number(this.state.count);
      element.totalPrice += Number(price);
      check = true;
      return element;
    }
    return element;
  })

  this.setState( prev => ({
    ...prev,
    items: check ? items : [...this.state.items, item],
    total: total,
    totalTax: totalTax
  }))
  
}

render(){
  return (
    <div>
      <Form 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
      <Receipt itemList={this.state.items} />
    </div>
  )
}
}

export default App;


