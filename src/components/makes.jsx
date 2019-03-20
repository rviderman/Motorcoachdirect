import React from 'react';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import MakesModels from '../data/makesModels.json';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      fontFamily: 'lato',
      fontSize: '1.5em',
      fontWeight: 'bold',
    }
    
  })

class Makes extends React.Component {  
  state = {
    make: sessionStorage.getItem('make'),    
    dieselOrGas: sessionStorage.getItem("dieselOrGas")
  }
  
  handleChange = event => {
    this.setState({ make: event.target.value }, () => {
      this.props.handlerToUpdate( this.state.make );   
    });
    sessionStorage.setItem("make", event.target.value)
    sessionStorage.removeItem("year")
    sessionStorage.removeItem("model")
    sessionStorage.removeItem("floorplan")
  }

  render() {
    const { classes } = this.props;
    const handleToUpdate = this.props.handlerToUpdate; 
    const makes = Object.keys(MakesModels[this.state.dieselOrGas]).map((make, idx) => {            
      return (     
                   
        <FormControlLabel
          key={idx}
          value={make}
          control={<Radio color="primary" />}
          label={make}
          labelPlacement="start"
          onChange={this.handleChange}          
        />          
      )   
    })   
    if (this.state.dieselOrGas) {
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography component={'span'} variant="h5" >
              Select Manufacturer
          </Typography>          
          <FormControl component="fieldset">
              <RadioGroup                  
                  aria-label="manufacturer"
                  name="make"
                  value={this.state.make}
                  onChange={() => {
                    handleToUpdate(this.handleChange)                    
                  }}
                  row
                  
              >

                {makes} 
              </RadioGroup>
          </FormControl>
        </Paper>
      );
    }
  }
}
Makes.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Makes);