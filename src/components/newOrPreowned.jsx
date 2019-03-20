import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      padding: theme.spacing.unit * 2
    },
  });

class NewOrPreowned extends React.Component {
  state = {
    value: sessionStorage.getItem("newOrPreowned"),
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    sessionStorage.setItem("newOrPreowned", event.target.value);    
  };

  render() {    
    const { classes } = this.props;
    var handleToUpdate  = this.props.handlerToUpdate;
    console.log(sessionStorage.getItem("newOrPreowned"));
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography component={'span'}  variant="h5" >
            Select New or Pre-Owned
        </Typography>              
        <FormControl component="fieldset">
            <RadioGroup
            aria-label="position"
            name="position"
            value={this.state.value}
            onChange={() => handleToUpdate(this.handleChange)}
            row
            >            
            <FormControlLabel
                value="new"
                control={<Radio color="primary" />}
                label="New"
                labelPlacement="start"
                onChange={this.handleChange}
            />          
            <FormControlLabel
                value="preowned"
                control={<Radio color="primary" />}
                label="Pre-Owned"
                labelPlacement="start"
                onChange={this.handleChange}
            />
            </RadioGroup>
        </FormControl>
      </Paper>
    );
  }
}
NewOrPreowned.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewOrPreowned);