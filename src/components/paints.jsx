import React, { Component } from 'react';
import Slider from "react-slick";

import PaintsMap from '../data/paintsMap'

import Typography from '@material-ui/core/Typography'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
    },
});

class Paints extends Component {    
    state = {
        activeSlide: 0,
        activeSlide2: 0
    }
    render() {                
        const {make, year, model} = this.props
        if (PaintsMap[make] &&
            PaintsMap[make][year] &&
            PaintsMap[make][year][model]) {    
            const paintsMap = PaintsMap[make][year][model]
            var settings = {
                dots: true,
                beforeChange: (current, next) => {    
                    const paint = paintsMap[next]
                    sessionStorage.setItem('paint', Object.keys(paint))
                    this.props.handlerToUpdate(paint[Object.keys(paint)[0]])                    
                    this.setState({ activeSlide: next })
                },
                afterChange: current => this.setState({ activeSlide2: current })
            }
            const paints = paintsMap.map((paint, idx) => {                
                return (
                    <div key={idx} >                                               
                        <img src={paint[Object.keys(paint)]} />
                        <Typography component={'span'} >{Object.keys(paint)} </Typography>
                    </div>
                )
            })
            return (
                <div className="container">            
                    <Slider {...settings}>   
                        {paints}                
                    </Slider>
                </div>
            );
        }
        else {
            return (<div/>)
        }
    }
}
export default Paints

