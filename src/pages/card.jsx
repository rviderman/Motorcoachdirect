import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Options from '../components/options';
import Header from '../components/header'  
import Logo from '../img/white-logo.svg'
import ModelsMap from '../data/modelsMap'
import Bar from '../components/bar'

class Card extends Component {

  state = {
    headerImage: Logo
  }

  componentDidMount() {
    this.setState({headerImage: ModelsMap[sessionStorage.getItem('year') + ' ' + sessionStorage.getItem('model')]})     
  }
  handleHeader = (headerImage) => {
    this.setState({headerImage: headerImage})
  }
  render() {
    return (
      <div>
        <Header headerImage={this.state.headerImage}/>
        <Options handlerToUpdate = {this.handleHeader} />
      </div>
    );
  }
} 


export default Card;