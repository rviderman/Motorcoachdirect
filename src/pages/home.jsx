import React, { Component } from 'react'
import Benefits from '../components/benefits'
import Header from '../components/header'
import Footer from '../components/footer'
import logo from '../img/logo.png'

class Home extends Component {  

  render() {
    return (
      <div >
        <Header headerImage={logo} />
        <Benefits />
        <Footer />
      </div>
    );
  }
}
  
export default Home;