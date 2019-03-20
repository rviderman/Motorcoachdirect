import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from "react-router"
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DieselOrGas from './dieselOrGas'
import Makes from './makes'
import Floorplan from './floorplan'
import Model from './model'
import yellow from '../img/yellow-logo.svg'
import MakesMap from '../data/makesMap'
import ModelsMap from '../data/modelsMap'
import FloorplansMap from '../data/floorplansMap'
import DieselGasMap from '../data/dieselGasMap'
import Header from '../components/header'
import logo from '../img/logo.png'

const styles = theme => ({
  root: {  
    minHeight: '800px'  
    
  },
  nextButton: {
    marginRight: theme.spacing.unit, 
    width: '150px',
    height: '40px',
    fontWeight: 'bold',
    letterSpaceing: '1px',
    background: '#F0C370',
    borderRadius: '2px',
    boxShadow: 'none',
    '&:hover':{
        background: '#9e7323'
    
      }
  },

  backButton: {
    padding: '50px',
    '&:hover':{
      background: 'none'
    }
  },

  buttonContainer:{
    textAlign:'center'
  },

  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },  
});


class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,    
    headerImage: sessionStorage.getItem("dieselOrGas") ? DieselGasMap[sessionStorage.getItem('dieselOrGas')] : yellow,
    nextStepDisabled: sessionStorage.getItem("dieselOrGas") === null,
    showLogo: true,
    skipped: new Set(),
  }

  componentDidMount() {
    if (sessionStorage.getItem('dieselOrGas')) {
      this.handleDieselGasHeader(sessionStorage.getItem('dieselOrGas'))
    }
  }

  isNewOrPreowned = step => {
    return step === 0
  }

  isStepOptional = step => {
    return false
  }

  handleCard = () => {
    this.props.history.push('/card/' + 
      sessionStorage.getItem("dieselOrGas") + "/" + 
      sessionStorage.getItem("make").replace(/\s/g,'_') + "/" + 
      sessionStorage.getItem('year') + "/" +
      sessionStorage.getItem('model').replace(/\s/g,'_') + "/")
  }

  /* activeStep:
   *  1=dieselOrGas
   *  2=make
   *  3=year-model
   */
  handleNext = () => {
    const { activeStep } = this.state
    let { skipped } = this.state
    if (activeStep === 1 && sessionStorage.getItem("make") === "Other") {
      this.props.history.push('/other/');
    } 
    else if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values())
      skipped.delete(activeStep)
    }
    else {
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      }, () => {
        switch (this.state.activeStep) {      
          case 0:
            if (sessionStorage.getItem('dieselOrGas')) {
              this.handleDieselGasHeader(sessionStorage.getItem('dieselOrGas'))
            }
          break    
          case 1:
            if (sessionStorage['make']) {
              this.handleMakesHeader(sessionStorage.getItem("make"))
            }
          break
          case 2:
            if (sessionStorage['model']) {
              this.handleModelHeader(sessionStorage.getItem("year") + ' ' + sessionStorage.getItem("model"))
            }
          break
          default: return false
        }
      })
      this.setNextStepDisabled(activeStep + 1)
    }    
  }  

  handleBack = () => {
    if (this.state.activeStep === 0) {
      this.props.history.push('/');
    }
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      nextStepDisabled: false
    }), () => {
      switch (this.state.activeStep) {
        case 0:
          if (sessionStorage.getItem('dieselOrGas')) {
            this.handleDieselGasHeader(sessionStorage.getItem('dieselOrGas'))
          }
        break
        case 1:
          if (sessionStorage['make']) {
            this.handleMakesHeader(sessionStorage.getItem("make"))
          }
        break
        case 2:
          if (sessionStorage['model']) {
            this.handleModelHeader(sessionStorage.getItem("year") + ' ' + sessionStorage.getItem("model"))
          }
        break
        default: return false
      }
    })  
  }

  handleEnableNextStep = () => {    
    this.setState(state => ({
      nextStepDisabled: false
    }));    
  }

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };


  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }
  
  setNextStepDisabled(step) {    
    switch (step) {
      case 0:        
        if (!this.state.nextStepDisabled && sessionStorage.getItem("dieselOrGas") === null) {         
          this.setState({nextStepDisabled: true})
        }
        else if (this.state.nextStepDisabled && sessionStorage.getItem("dieselOrGas") !== null) {
          this.setState({nextStepDisabled: false})
        }
        break;
      case 1:      
        if (!this.state.nextStepDisabled && sessionStorage.getItem("make") === null) {
           this.setState({nextStepDisabled: true})
        }
        else if (this.state.nextStepDisabled && sessionStorage.getItem("make") !== null) {
          this.setState({nextStepDisabled: false})             
        }
        break
      case 2:        
        if (!this.state.nextStepDisabled && sessionStorage.getItem("model") === null) {
          this.setState({nextStepDisabled: true})
        }
        else if (this.state.nextStepDisabled && sessionStorage.getItem("model") !== null) {
          this.setState({nextStepDisabled: false})
        }
        break     
      default: return false
    }
  }
  
  getSteps = () => {
    let dieselOfGas = sessionStorage.getItem('dieselOrGas'),
        make = sessionStorage.getItem('make'),
        year = sessionStorage.getItem('year'),
        model = sessionStorage.getItem('model')
    return [
      dieselOfGas ? dieselOfGas.charAt(0).toUpperCase() + dieselOfGas.slice(1) : 'Select Diesel or Gas', 
      make ? make : 'Which Manufacturer', 
      model ? year + ' ' + model : 'Select your Model'
    ]
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DieselOrGas handlerToUpdate = {this.handleDieselGasHeader} />;
      case 1:
        return <Makes handlerToUpdate = {this.handleMakesHeader} />;
      case 2:
        return <Model handlerToUpdate = {this.handleModelHeader} />;      
      default:
        return ''
    }
  }

  handleDieselGasHeader = (dieselGas) => {
    this.setNextStepDisabled(this.state.activeStep)
    this.props.handlerToUpdate( DieselGasMap[dieselGas])
  }
  
  handleMakesHeader = (make) => {
    this.setNextStepDisabled(this.state.activeStep)
    this.props.handlerToUpdate( MakesMap[make])    
  } 
  
  handleModelHeader = (year, model) => { 
    console.log(sessionStorage.getItem('dieselOrGas'), sessionStorage.getItem('make'), year, model) 
    this.setNextStepDisabled(this.state.activeStep)
    let models = ModelsMap[sessionStorage.getItem('dieselOrGas')][sessionStorage.getItem('make')][year];    
    if (models){
      models.map((_model) => {
        let image = _model[model]
        if (image) {
          this.props.handlerToUpdate(image)
        }
        
      })
    }
    // 
    // this.props.handlerToUpdate( ModelsMap[sessionStorage.getItem('dieselOrGas')][sessionStorage.getItem('make')][year])
  }
 
  /* floorplan:
   *  model year floorplan
   */ 
  handleFloorplanHeader = (yearModelFloorplan) => { 
    this.setNextStepDisabled(this.state.activeStep);    
    this.props.handlerToUpdate( FloorplansMap[yearModelFloorplan]);     
  }
  
  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;   
    return (
      <div className={classes.root}>    
      <Header headerImage={logo} />        
        {/* <Header headerImage={this.state.headerImage} ></Header> */}

        <Stepper activeStep={activeStep} >
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }            
            return (
              <Step className={classes.step} key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>                
              </Step>
            );
          })}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography component={'span'}  className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography component={'span'}  className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
              <div className={classes.buttonContainer}>         
                  <Button
                    onClick={this.handleBack}
                    className={classes.backButton}
                    disabled= {this.state.activeStep < 1}
                  >
                  Back
                </Button>               
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.skipButton}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  onClick={activeStep === steps.length - 1 ? this.handleCard : this.handleNext}
                  className={classes.nextButton}
                  disabled={this.state.nextStepDisabled}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>        
      </div>
    );
  }
}
HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};
export default withRouter(withStyles(styles)(HorizontalLinearStepper))