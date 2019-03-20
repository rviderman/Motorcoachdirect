import React, { Component } from 'react';
import Slider from "react-slick";
import WoodsMap from '../data/woodsMap'

import Typography from '@material-ui/core/Typography'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Woods extends Component {
    state = {
        activeSlide: 0,
        activeSlide2: 0
    }
    render() {
        const {make, year} = this.props
        if (WoodsMap[make] &&
            WoodsMap[make][year]) {
            const woodsMap = WoodsMap[make][year]
            var settings = {
                dots: true,
                beforeChange: (current, next) => {    
                    const wood = woodsMap[next]
                    sessionStorage.setItem('wood', Object.keys(wood))
                    // this.props.handlerToUpdate(wood[Object.keys(wood)[0]])               
                    this.setState({ activeSlide: next })
                },
                afterChange: current => this.setState({ activeSlide2: current })
            }
            const woods = woodsMap.map((wood, idx) => {                
                return (
                    <div key={idx} >                                               
                        <img src={wood[Object.keys(wood)]} />
                        <Typography component={'span'} >{Object.keys(wood)} </Typography>
                    </div>
                )
            })
            return (
                <div className="container">            
                    <Slider {...settings}>   
                        {woods}                
                    </Slider>
                </div>
            );
        }
        else {
            return (<div/>)
        }
    }
}

export default Woods