import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MakesModels from '../data/makesModels.json';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
    },
});

class Floorplan extends React.Component {  
    state = {
        dieselOrGas: sessionStorage.getItem("dieselOrGas"),      
        value: sessionStorage.getItem("floorplan"), 
        make: sessionStorage.getItem("make"),
        model: sessionStorage.getItem("model"),        
        year: sessionStorage.getItem('year')
    }

    handleChange = event => {
        this.setState({ value: event.target.value }, () => {
            this.props.handlerToUpdate( this.state.year + ' ' + this.state.model + ' ' + this.state.value ); 
        });        
        sessionStorage.setItem("floorplan", event.target.value);
    };

    render() {
        const { classes } = this.props;        
        const handleToUpdate = this.props.handlerToUpdate;   
        if (this.state.dieselOrGas &&
            this.state.make &&
            this.state.year &&
            this.state.model) {
            const floorplans = MakesModels[this.state.dieselOrGas][this.state.make][this.state.year][this.state.model].map((floorplan, idx) => {                
                return (    
                    <FormControlLabel
                        key={idx}
                        value={floorplan}
                        control={<Radio color="primary" />}
                        label={floorplan}
                        labelPlacement="start"
                        onChange={this.handleChange}
                    />
                );
            })            
            return (                
                <Paper className={classes.root} elevation={1}>
                    <Typography component={'span'} variant="h5" >
                        Select Floorplan
                    </Typography>                
                    <FormControl component="fieldset">
                        <RadioGroup
                        aria-label="floorplan"
                        name="floorplan"
                        value={this.state.value}
                        onChange={() => handleToUpdate(this.handleChange)}
                        row
                        >
                        {floorplans}            
                    </RadioGroup>
                </FormControl>
                </Paper>
            );
        }
    }
}
Floorplan.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Floorplan);