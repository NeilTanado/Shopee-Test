import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Jumbotron,FormControl,FormGroup,ControlLabel,Button,ButtonToolbar,MenuItem,DropdownButton,Table,thead,tbody } from 'react-bootstrap'

class App extends Component {
  constructor(){
    super()

    this.handleChange = this.handleChange.bind(this)
    this.rateExchange = this.rateExchange.bind(this)
    this.deleteCurrency = this.deleteCurrency.bind(this)

    this.state = {
      value : '',
      rates : [],
      newRates : [],
      checkedRate : [],
      calculated: []
    }
    
  }

  componentDidMount(){
    this.rateExchange()
  }
  
  checkCurrency(){
    console.log('masuk sini')
    console.log(this.state.value,'=====')
    let data = this.state.rates
    let c = []
    for(var i = 0 ; i < data.length ; i ++){
      c.push({name:data[i].name,currency:data[i].currency,surName: data[i].surName,latestTrade:Math.ceil(data[i].currency*this.state.value),status : data[i].status})
    }
    this.setState({newRates : c})
  }

  async calculateCurrency(name){
    let a = []
    this.state.rates.forEach((rate)=>{
      if(rate.name === name){
        rate.status = true
      }
      a.push(rate)
    })
    await this.setState({newRates : a})
    await this.checkCurrency()
  }


  rateExchange(){
    axios.get('https://exchangeratesapi.io/api/latest?base=USD')
    .then(dataValue =>{
      let results = []
      let data = []
      results = Object
        .keys(dataValue.data.rates)
        .map(k => ({ name : k, currency : dataValue.data.rates[k]}));
      
      results.forEach((hasil)=>{
        if(hasil.name === 'IDR'){
          let obj = { name : hasil.name, surName : 'Indonesian Rupiah' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'EUR'){
          let obj = { name : hasil.name, surName : 'Euro' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'JPY'){
          let obj = { name : hasil.name, surName : 'Japan Yen' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'CAD'){
          let obj = { name : hasil.name, surName : 'Canadian Dollar' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'GBP'){
          let obj = { name : hasil.name, surName : 'Poundsterling' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'CHF'){
          let obj = { name : hasil.name, surName : 'Franc Swiss' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'SGD'){
          let obj = { name : hasil.name, surName : 'Singapore Dollar' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'INR'){
          let obj = { name : hasil.name, surName : 'India Rupee' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'MYR'){
          let obj = { name : hasil.name, surName : 'Malaysia Ringgit' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'CNY'){
          let obj = { name : hasil.name, surName : 'China Yuan' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
        else if(hasil.name === 'KRW'){
          let obj = { name : hasil.name, surName : 'Korean Won' , currency : hasil.currency , latestTrade : Math.ceil(this.state.value*hasil.currency), status: false }
          data.push(obj)
        }
      })
      this.setState({rates : data})
      this.checkCurrency()
    })
    .catch(err =>{
      return err
    })
  }

  async deleteCurrency(name){
    let a = []
    this.state.rates.forEach((rate)=>{
      if(rate.name === name){
        rate.status = false
      }
      a.push(rate)
    })
    await this.setState({newRates : a})
    await this.checkCurrency()
  }
  
  async handleChange(e) {
    e.preventDefault();
    
    let number = e.target.value
    let validate = await this.checkValidate(e.target.value)

    if (validate != false) {
      await this.setState({ value: number })    
      await this.checkCurrency() 
    }

  }

  checkValidate (num) {

    const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']    
    let validate = null

    for (let i = 0; i < String(num).length; i++) {

      if (arr.indexOf(num[i]) == -1) {
        validate = false
        return validate
      } else {
        validate = true
      }

    }

    return validate

  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 style={{ paddingLeft: 50}}> Welcome </h1>
          <p style={{ paddingLeft: 50}}> We will help you to count exchange</p>
        </Jumbotron>
        <form style={{ paddingTop : 50}}>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Please insert amount of USD</ControlLabel>
            <FormControl
              type="text"
              value= {this.state.value}
              placeholder="Enter your USD"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <ButtonToolbar style = {{paddingBottom : 30}}>
          <DropdownButton
            bsSize="small"
            title="Select Currency"
            id="dropdown-size-larg  e"
          >
          {this.state.rates.map((rate,i) => {
            return(
            <MenuItem onClick={()=>this.calculateCurrency(rate.name)}eventKey = {i}>{rate.name}</MenuItem>
            )
          })}
          </DropdownButton>
        </ButtonToolbar>
        <Table striped bordered condensed hover style={{paddingTop:100}}>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Name</th>
              <th>Rates</th>
              <th>Accumulation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.newRates.map((rate,i)=>{
              if(rate.status){
                return(
                <tr>
                  <td>{rate.name}</td>  
                  <td>{rate.surName}</td>
                  <td>1USD = {rate.name} {(rate.currency).toLocaleString()}</td>
                  <td>{rate.name} {(rate.latestTrade).toLocaleString()}</td>
                  <td><Button bsStyle="danger" onClick={()=>this.deleteCurrency(rate.name)}> Delete </Button></td>
                </tr>
              )
              }else{
                return null
              }             
            })}
          </tbody>
        </Table>
       </div>
    );
  }
}

export default App;
