import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MaskedInput from 'react-text-mask';
import { withRouter } from "react-router";
import Financials from './financials';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: theme.spacing.unit * 2,      
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    paper: {
        paddingTop:10,
        paddingBottom:10,
    },
})

function PhoneMask(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

PhoneMask.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

class Other extends Component {
    state = {
        make: '',
        year: '',
        model: '',
        
        nextMonthPurchase: false,
        other: '',
    
    }

    handleBack = () => {
      this.props.history.push('/');
    }

    handleChangeSwitch = name => event => {
        this.setState({ [name]: event.target.checked })   
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    
    render() {
        const { classes } = this.props; 
        const { email, make, year, model, name, nextMonthPurchase, other, phone } = this.state;
        return (
            <Paper className={classes.root} elevation={1}>
                <Typography component={'span'} variant="h6" >
                We source all manufacturers and models. Let us know what you're looking for and we can help you locate it.  <br/>
                </Typography>
                <FormControl component="fieldset">
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <TextField
                            id="make"
                            label="Manufacturer"
                            className={classes.textField}
                            value={make}                            
                            onChange={this.handleChange('make')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="year"
                            label="Year"
                            className={classes.textField}
                            value={year}                            
                            onChange={this.handleChange('year')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="model"
                            label="Model"
                            className={classes.textField}
                            value={model}
                            onChange={this.handleChange('model')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="other"
                            label="Other specifications"
                            className={classes.textField}
                            value={other}
                            onChange={this.handleChange('other')}
                            margin="normal"
                        />
                    </Grid>                                        
                    <Grid item xs={6}>
                        <FormLabel component="legend">If we find your Coach are you looking to purchase in the next month?</FormLabel>
                        <FormControlLabel 
                        control={
                            <Switch
                            classes={{
                                switchBase: classes.iOSSwitchBase,
                                bar: classes.iOSBar,
                                icon: classes.iOSIcon,
                                iconChecked: classes.iOSIconChecked,
                                checked: classes.iOSChecked,
                            }}
                            
                            disableRipple
                            checked={nextMonthPurchase}
                            onChange={this.handleChangeSwitch('nextMonthPurchase')}
                            value="nextMonthPurchase"
                            />
                        }
                        label={nextMonthPurchase ? 'Yes' : 'No'}
                        labelPlacement={nextMonthPurchase ? 'start' : 'end'}
                        />
                    </Grid>
                     
                    <Grid item xs={12}> 
                        <Button
                            onClick={this.handleBack}
                            className={classes.button}
                        >
                        Back
                        </Button>             
                        <Financials make={this.state.make} year={this.state.year} model={this.state.model} other={this.state.other} nextMonthPurchase={this.state.nextMonthPurchase} />
                    </Grid>
                </Grid>
                </FormControl>
            </Paper>
        );
    }
}
  
Other.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(Other));