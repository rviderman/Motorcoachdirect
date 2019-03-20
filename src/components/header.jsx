import React, { Component } from 'react';
import logo from '../img/white-logo.svg'

import liberty from '../img/motorcoach-direct/Liberty-Coach.jpg'

class Header extends Component {         
    render() {    
        let {headerImage, scene} = this.props;   
          
        return (            
            <div>                
                <header className="App-header">   
                    <img src={headerImage} className="App-headerImage" alt="" />    
                                                                                                                                                        
                </header>
            </div>
        );
    }
}
export default Header