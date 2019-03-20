import React, { Component } from 'react';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography'
import FloorplansMap from '../data/floorplansMap'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
    },
});

class Floorplans extends Component {    
    state = {
        activeSlide: 0,
        activeSlide2: 0,
    }
    render() { 
        const {make, year, model} = this.props
        if (FloorplansMap[make] &&
            FloorplansMap[make][year] &&
            FloorplansMap[make][year][model]) {
            const floorplansMap = FloorplansMap[make][year][model]            
            var settings = {
                dots: true,                
                beforeChange: (current, next) => {  
                    const floorplan = floorplansMap[next]
                    this.props.handlerToUpdate(floorplan[Object.keys(floorplan)[0]])                                   
                    this.setState({ activeSlide: next })
                },
                afterChange: current => this.setState({ activeSlide2: current }),
            }
            const floorplans = floorplansMap.map((floorplan, idx) => {         
                return (
                    <div key={idx} >                                               
                        <img src={floorplan[Object.keys(floorplan)]} />
                        <Typography component={'span'} >{Object.keys(floorplan)} </Typography>
                        
                    </div>
                )
            })
            return (                
                <div className="container">            
                    <Slider {...settings}>   
                        {floorplans}                
                    </Slider>
                </div>
            );
        }        
        else {
            return (<div/>)
        }
    }
}

export default Floorplans