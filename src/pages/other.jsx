import React, { Component } from 'react';
import OtherComponent from '../components/other';
import Header from '../components/header';
import logo from '../img/logo.png';
import Footer from '../components/footer';

class Other extends Component {
    
    render() {
        return (
            <div>                
                <Header headerImage={logo} />
                <OtherComponent />  
                <Footer />
            </div>
        )
    }
}
  
export default Other;