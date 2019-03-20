import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from "react-router"
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import purple from '@material-ui/core/colors/purple'
import Financials from './financials'
import Button from '@material-ui/core/Button'
import Floorplans from './floorplans'
import Paints from './paints'
import Woods from './woods'
import Years from './years'
import OptionsMap from '../data/optionsMap'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    disclaimer: {
      fontSize:13,
      marginBottom: theme.spacing.unit * 2
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    colorSwitchBase: {
      color: purple[300],
      '&$colorChecked': {
        color: purple[500],
        '& + $colorBar': {
          backgroundColor: purple[500],
        },
      },
    },
    colorBar: {},
    colorChecked: {},
    iOSSwitchBase: {
      '&$iOSChecked': {
        color: theme.palette.common.white,
        '& + $iOSBar': {
          backgroundColor: blue[500],
        },
      },
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.sharp,
      }),
    },
    iOSChecked: {
      transform: 'translateX(15px)',
      '& + $iOSBar': {
        opacity: 1,
        border: 'none',
      },
    },
    iOSBar: {
      borderRadius: 13,
      width: 42,
      height: 26,
      marginTop: -13,
      marginLeft: -21,
      border: 'solid 1px',
      borderColor: blue[400],
      backgroundColor: pink[500],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
      width: 24,
      height: 24,
    },
    iOSIconChecked: {
      boxShadow: theme.shadows[1],
    },
    grid: {
      marginBottom: theme.spacing.unit * 2
    }
  })

  class Options extends Component {
    state = {
      exteriorColor: '',
      interiorColor: '',
      checkedBed: true,
      checkedHeater: true,
      checkedFridge: true,
      checkedSatelite: true,
      checkedCollision: true
    }
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
    }
  
    handleChangeSwitch = name => event => {
      this.setState({ [name]: event.target.checked })
    }
  
    handleBack = event => {
      this.props.history.push('/start/');
    }

    handlePaintsHeader = (paint) => {   
      this.props.handlerToUpdate(paint);       
    } 

    handleWoodsHeader = (wood) => {
      // this.props.handlerToUpdate ( wood )
    }

    handleFloorplansHeader = (floorplans) => {
      console.log(floorplans)
      this.props.handlerToUpdate(floorplans)
    }

    render() {
      const { classes } = this.props;    
      const path = this.props.location.pathname.split('/')
      const dieselOrGas = path[2].replace(/_/, ' '),
            make = path[3].replace(/_/, ' '),
            year = path[4],
            model = path[5].replace(/_/g, ' ')
      const options = OptionsMap[make][year].map((option, idx) => {
        let source = {}
        switch(option.source) {
          case 'Years':
            source = <Years handlerToUpdate = {this.handleYearsHeader} dieselOrGas={dieselOrGas} make={make} model={model} />
          break
          case 'Floorplans':
            source = <Floorplans handlerToUpdate = {this.handlePaintsHeader} make={make} year={year} model={model} /> 
          break
          case 'Paints':
            source = <Paints handlerToUpdate = {this.handlePaintsHeader} make={make} year={year} model={model} /> 
          break
          case 'Woods':
            source = <Woods handlerToUpdate = {this.handlePaintsHeader} make={make} year={year} />
          break
        }
        return (
          <Grid item xs={option.size} className={classes.grid} key={idx}>
            <Paper className={classes.paper}>
              <Typography component={'span'} variant="h6" >
                  {option.name}
              </Typography>
              {source}              
            </Paper>
          </Grid>
        )
      })
      return (
          <Paper className={classes.root} elevation={1}>            
            <Typography component={'span'} variant="h5" >
              {make + ' ' + year + ' ' + model}
            </Typography>    
            <form className={classes.root} autoComplete="off">
              <Grid container spacing={24}>              
                {options}
                <Grid item xs={12} className={classes.grid}>  
                  <Button                
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>            
                  <Financials />
                </Grid>
              </Grid>
            </form>          
          </Paper> 
      );
    }
  }
    
  Options.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withRouter(withStyles(styles)(Options))