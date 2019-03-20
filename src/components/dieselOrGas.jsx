import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import gas from '../img/gas.png'
import diesel from '../img/diesel.png'

const styles = theme => ({
    root: {
      boxShadow:'none',
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      fontFamily: 'lato',
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
    dieselRadio:{
      position: 'absolute',
      bottom: '-12px',
      left: '45px',
    },
    gasRadio:{
      position: 'absolute',
      bottom: '-12px',
      right: '90px',
    },
    engine:{
      padding:'20px',
      marginTop:'20px',
      maxWidth: '150px',
      height: '150px'
    },
    engineTitle:{
      fontWeight: 'bold',
    },
    questionTitle: {
      color: '#213669',
      fontWeight: 'bold',
      fontFamily: 'lato',
      padding: '20px',
      
    },
  })

class DieselOrGas extends React.Component {
  state = {
    value: sessionStorage.getItem('dieselOrGas'),
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.handlerToUpdate( this.state.value ); 
    })
    sessionStorage.setItem("dieselOrGas", event.target.value)
    sessionStorage.removeItem("make")
    sessionStorage.removeItem("year")
    sessionStorage.removeItem("model")
    sessionStorage.removeItem("floorplan") 

  }

  render() {    
    const { classes } = this.props
    var handleToUpdate  = this.props.handlerToUpdate
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography className={classes.questionTitle} variant="h5" component="h3">
            Select Diesel or Gas
        </Typography>              
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="position"
            name="position"
            value={this.state.value}
            onChange={() =>  handleToUpdate(this.handleChange)}
            row
          >                   

            <FormControlLabel
                value="diesel"
                control={<Radio color="primary" className={classes.dieselRadio}/>}
                label={<div><img src={diesel} className={classes.engine}/><div className={classes.engineTitle} >Diesel</div>  </div> }
                labelPlacement="start"
                onChange={this.handleChange}
            />

            <FormControlLabel
                value="gas"
                control={<Radio color="primary" className={classes.gasRadio}/>}
                label={<div><img src={gas} className={classes.engine}/> <div className={classes.engineTitle}>Gas</div>  </div> }
                labelPlacement="start"
                onChange={this.handleChange}
            />
            </RadioGroup>
        </FormControl>
      </Paper>
    )
  }
}
DieselOrGas.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(DieselOrGas)