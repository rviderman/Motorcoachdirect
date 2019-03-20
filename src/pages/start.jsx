import React, { Component } from 'react'
import Stepper from '../components/stepper'
import Header from '../components/header'
import Logo from '../img/white-logo.svg'

class Start extends Component { 
  state = {
    headerImage: Logo,
    scene:''
  }
  handleHeader = (headerImage) => {
    this.setState({headerImage: headerImage})
  }
  
  render() {
    return (
      <div> 
        <Header headerImage={this.state.headerImage}  />       
        <Stepper handlerToUpdate = {this.handleHeader} />           
      </div>
    );
  }
}     
  
export default Start;