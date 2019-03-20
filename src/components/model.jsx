import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MakesModels from '../data/makesModels.json';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        fontFamily: 'lato',
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
});

class Model extends React.Component {  
     
    state = {
      dieselOrGas: sessionStorage.getItem("dieselOrGas"),      
      make: sessionStorage.getItem("make"),
      model: sessionStorage.getItem("model"),
      models: sessionStorage.getItem("dieselOrGas") && sessionStorage.getItem("make") && sessionStorage.getItem('year') ?      
        Object.keys(MakesModels[sessionStorage.getItem("dieselOrGas")][sessionStorage.getItem("make")][sessionStorage.getItem('year')]).map((model, idx) => {
            return (
                <FormControlLabel
                    key={idx}
                    value={model}
                    control={<Radio color="primary" />}
                    label={model}
                    labelPlacement="start"
                    onChange={this.handleChangeModel}
                />
            )
        }) : '',      
      year: sessionStorage.getItem('year')
    };

    handleChangeYear = event => {    
        if (this.state.dieselOrGas &&
            this.state.make && 
            event.target.value) {
            this.setState({ year: event.target.value }, () => {
                if (this.state.model) {
                    this.props.handlerToUpdate( this.state.year,  this.state.model);             
                }                
                
            } );
            sessionStorage.setItem("year", event.target.value)    
            this.setState({ 
                models:  Object.keys(MakesModels[this.state.dieselOrGas][this.state.make][event.target.value]).map((model, idx) => {
                    return (
                        <FormControlLabel
                            key={idx}
                            value={model}
                            control={<Radio color="primary" />}
                            label={model}
                            labelPlacement="start"
                            onChange={() => this.props.handlerToUpdate(this.handleChangeModel)}
                        />
                    )
                })
            })
        }
    }

    handleChangeModel = event => {        
        this.setState({model: event.target.value}, () => {
            this.props.handlerToUpdate( this.state.year,  this.state.model);             
        });
        sessionStorage.setItem("model", event.target.value)
        sessionStorage.removeItem("floorplan")
    }

    render() {
        const { classes } = this.props;         

        const years = Object.keys(MakesModels[this.state.dieselOrGas][this.state.make]).reverse().map((year, idx) => {
            return (
                //myArray.map((val, index) => myArray[myArray.length - 1 - index]);
                <FormControlLabel
                    key={idx}
                    value={year}
                    control={<Radio color="primary" />}
                    label={year}
                    labelPlacement="start"
                />
            )
        })
        const model = (            
            <FormControl component="fieldset">
                <RadioGroup 
                    aria-label="model"
                    name="model"
                    value={this.state.model}
                    onChange={this.handleChangeModel}
                    row
                >
                    {this.state.models}
                </RadioGroup>
            </FormControl>
        )
        
        return (
        <Paper className={classes.root} elevation={1}>
            <Typography component={'span'} variant="h5" >
                Select your Model
            </Typography>
             <FormControl component="fieldset">
                <RadioGroup
                    aria-label="year"
                    name="year"
                    value={this.state.year}
                    onChange={this.handleChangeYear}
                    row
                >                      
                {years}
                </RadioGroup>                
            </FormControl><br/>
            {model}
        </Paper>
        );
    }    
}
Model.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Model);