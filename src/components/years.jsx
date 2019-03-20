import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ModelsMap from '../data/modelsMap'
import MakesModelsYears from '../data/makesModelsYears.json'

const styles = theme => ({
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

class Years extends React.Component {
  state = {
    alignment: 'left',
    formats: ['bold'],
  };

  handleFormat = (event, formats) => this.setState({ formats });

  handleAlignment = (event, alignment) => this.setState({ alignment });

  render() {
    const { classes, dieselOrGas, make, model } = this.props;
    const { alignment, formats } = this.state;    
    let years = MakesModelsYears[dieselOrGas][make][model]
    console.log(years)
    return (
      <div className={classes.toggleContainer}>
          <ToggleButtonGroup value={alignment} exclusive onChange={this.handleAlignment}>
              <ToggleButton value='2019'>
                  2019
              </ToggleButton>
              <ToggleButton value='2018'>
                  2018
              </ToggleButton>                                
          </ToggleButtonGroup>
      </div>
    );
  }
}

Years.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Years);