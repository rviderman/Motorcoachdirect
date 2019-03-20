import React, { Component } from 'react';


class Footer extends Component {         
    render() {    
        let {headerImage, scene} = this.props;   
          
        return (            
            <div className='footer-container'>                
                <footer>        
                    <span className='footer-phone'>470-878-9284</span>
                    <span className="footer-address"> 10214 Hickory Flat Hwy, Suite 200 Woodstock, GA 30188</span>                                                                                                                                                      
                    <span className="footer-copyright">© 2019 MotorCoach Direct</span>
                </footer>
            </div>
            
        );
    }
}
export default Footer