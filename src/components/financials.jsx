import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import request from 'request';
import { withRouter } from "react-router";

const styles = theme => ({
    button: {
      width: '200px',
      height: '46px',
      fontWeight: 'bold',
      letterSpaceing: '1px',
      background: '#F0C370',
      borderRadius: '2px',
      boxShadow: 'none',
      '&:hover':{
          background: '#9e7323'
      }     
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing.unit * 2,
      minWidth: 200,
    },
    formLabel: {
      fontSize:16
    },
    disclaimer: {
      fontSize:13
    },
    formControlLabel: {
      marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
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
  });
  
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

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }

  function EmailFormatCustom(props) {
    const { inputRef, ...other } = props;
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]}
        showMask
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  class Financials extends React.Component {
    state = {
      annualIncome: '',
      creditScore: '',
      desiredDownPayment: '',
      email: '',
      open: false,                  
      name: '',
      numberformat: '1320',
      phone: '(   )    -    ',
      purchasePlan: '',
      preferredContactMethod: '',
      w21099: ''
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    handleMaxWidthChange = event => {
      this.setState({ maxWidth: event.target.value });
    };
  
    handleFullWidthChange = event => {
      this.setState({ fullWidth: event.target.checked });
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleChangeSelect = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    handleOk = () => {
      const {make, year, model, other, nextMonthPurchase} = this.props;
      this.setState({ open: false });
      request.post({
        url: 'https://us-central1-winter-agency-229213.cloudfunctions.net/sendgridEmail',
        form: {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          make: make,
          model: model,
          year: year,
          other: other,  
          nextMonthPurchase: nextMonthPurchase,
          preferredContactMethod: this.state.preferredContactMethod,
          purchasePlan: this.state.purchasePlan,
          desiredDownPayment: this.state.desiredDownPayment,
          creditScore: this.state.creditScore,
          annualIncome: this.state.annualIncome,
          w21099: this.state.w21099
        }
      }, (err, response, body) => {
        sessionStorage.clear();
        this.props.history.push('/');
      });
    };
    handleCancel = () => {
      this.setState({ open: false });
    };
    
    render() {
      const { classes } = this.props;
      const { email, phone, purchasePlan, name, numberformat, w21099, preferredContactMethod } = this.state;
      const isOkEnabled = email.length !== 0 && 
                          name.length !== 0 

      return (
        <React.Fragment>
          <Button 
            variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={this.handleClickOpen}>
            Next
          </Button>
          <Dialog
            fullWidth={this.state.fullWidth}
            maxWidth={this.state.maxWidth}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="max-width-dialog-title">Pre-qualification assessment</DialogTitle>
            <DialogContent>
            {/* <DialogContentText>
                Please supply information so we may know more about your request
              </DialogContentText>
              <FormLabel className={classes.disclaimer} component="legend">
                HELP US BEST SERVE YOU IN GETTING YOU AS CLOSE TO WHOLESALE PRICING AS POSSIBLE. YOUR ANSWERS TO THE QUESTIONS BELOW GIVE US A BASELINE IDEA OF WHERE YOU WANT TO BE AND HOW WE CAN BEST SERVE YOU
              </FormLabel> */}
              <form className={classes.form} noValidate>
                <FormControl className={classes.formControl}>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <TextField
                          id="name"
                          label="Name"
                          className={classes.textField}
                          value={name}
                          error={name === ''}
                          onChange={this.handleChange('name')}
                          margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                          id="email"
                          label="Email"
                          className={classes.textField}
                          value={email}                            
                          error={email === ''}
                          onChange={this.handleChange('email')}
                          inputComponent={EmailFormatCustom}
                          margin="normal"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="formatted-text-mask-input">Phone</InputLabel>
                        <Input
                          value={phone}
                          onChange={this.handleChange('phone')}
                          id="formatted-text-mask-input"
                          inputComponent={PhoneMask}
                          margin="normal"
                        />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel className={classes.formLabel} component="legend">Preferred method of contact</FormLabel>
                        <FormControlLabel control={
                          <Switch classes={{
                            switchBase: classes.iOSSwitchBase,
                            bar: classes.iOSBar,
                            icon: classes.iOSIcon,
                            iconChecked: classes.iOSIconChecked,
                            checked: classes.iOSChecked,
                          }}
                          disableRipple
                          checked={preferredContactMethod}
                          onChange={this.handleChangeSwitch('preferredContactMethod')}
                          value="preferredContactMethod"
                          />
                        }
                        label={preferredContactMethod ? 'Email' : 'Phone'}
                        labelPlacement={preferredContactMethod ? 'start' : 'end'}
                        />                      
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel component="legend">How do you plan to purchase your coach</FormLabel>
                        <FormControlLabel control={
                          <Switch classes={{
                            switchBase: classes.iOSSwitchBase,
                            bar: classes.iOSBar,
                            icon: classes.iOSIcon,
                            iconChecked: classes.iOSIconChecked,
                            checked: classes.iOSChecked,
                          }}
                          disableRipple
                          checked={purchasePlan}
                          onChange={this.handleChangeSwitch('purchasePlan')}
                          value="purchasePlan"
                          />
                        }
                        label={purchasePlan ? 'Cash' : 'Finance'}
                        labelPlacement={purchasePlan ? 'start' : 'end'}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="desiredDownPayment">Desired down payment</InputLabel>
                        <Select
                          value={this.state.desiredDownPayment}
                          onChange={this.handleChangeSelect}
                          inputProps={{
                            name: 'desiredDownPayment',
                            id: 'desiredDownPayment',
                          }}
                        >
                          <MenuItem value="">
                          <em>None</em>
                          </MenuItem>
                          <MenuItem value={'10%'}>10%</MenuItem>
                          <MenuItem value={'20%'}>20%</MenuItem>
                          <MenuItem value={'30%'}>30%</MenuItem>
                          <MenuItem value={'40%'}>40%</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="creditScore">Your credit score?</InputLabel>
                        <Select
                          value={this.state.creditScore}
                          onChange={this.handleChangeSelect}
                          inputProps={{
                              name: 'creditScore',
                              id: 'creditScore',
                          }}
                        >
                          <MenuItem value="">
                          <em>None</em>
                          </MenuItem>
                          <MenuItem value={'650-700'}>650-700</MenuItem>
                          <MenuItem value={'700-750'}>700-750</MenuItem>
                          <MenuItem value={'750-800'}>750-800</MenuItem>
                          <MenuItem value={'800-850'}>800-850</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="annualIncome">Your annual income?</InputLabel>
                        <Select
                          value={this.state.annualIncome}
                          onChange={this.handleChangeSelect}
                          inputProps={{
                              name: 'annualIncome',
                              id: 'annualIncome',
                          }}
                        >
                          <MenuItem value="">
                          <em>None</em>
                          </MenuItem>
                          <MenuItem value={'50k-100k'}>50k-100k</MenuItem>
                          <MenuItem value={'100k-250k'}>100k-250k</MenuItem>
                          <MenuItem value={'250k-500k'}>250k-500k</MenuItem>
                          <MenuItem value={'500k+'}>500k+</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel className={classes.formLabel} component="legend">If financing and you are self employed or 1099, would you be able to furnish tax returns for the previous 2 tax years?</FormLabel>
                        <FormControlLabel control={
                          <Switch classes={{
                            switchBase: classes.iOSSwitchBase,
                            bar: classes.iOSBar,
                            icon: classes.iOSIcon,
                            iconChecked: classes.iOSIconChecked,
                            checked: classes.iOSChecked,
                          }}
                          disableRipple
                          checked={w21099}
                          onChange={this.handleChangeSwitch('w21099')}
                          value="w21099"
                          />
                        }
                        label={purchasePlan ? 'Yes' : 'No'}
                        labelPlacement={purchasePlan ? 'start' : 'end'}
                        />                      
                    </Grid>
                    <FormLabel className={classes.disclaimer} component="legend">
                    DISCLAIMER:  ALL SELECTIONS WITHIN THIS ASSESSMENT ARE CONFIDENTIAL AND NOT SHARED WITH ANY THIRD PARTY . WE BELIEVE IN PERSONAL PRIVACY SO WE WILL NEVER SHARE YOUR EMAIL, PHONE NUMBER, OR LOCATION DATA FOR ANY REASON.
                    </FormLabel>
                  </Grid>
                                    
                </FormControl>                
              </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.handleOk} color="primary" disabled={!isOkEnabled}>
                    Submit
                </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }
  }
  
  Financials.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withRouter(withStyles(styles)(Financials));