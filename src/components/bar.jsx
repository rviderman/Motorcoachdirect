import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import emblem from '../img/mcd emblem.svg'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class Bar extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    }

    toggleDrawer = (side, open) => () => {

        this.setState({
            [side]: open
        });
    };
    
    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
              <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">MotorCoach-Direct
        </Typography>
        <Typography component="p">
        10214 Hickory Flat Hwy, Suite 200<br />
        Woodstock, GA 30188
          <br />
         
        </Typography>
      </CardContent>
    </Card>
              
            </div>
        );
      
        return (
            <div className={classes.root}>
            <AppBar  position="absolute"  style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer('top', true)}>
                    <Avatar alt="Motorcoach Direct" src={emblem}  />                
                </IconButton>          
                <div className={classes.grow} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    />
                </div>
                </Toolbar>
            </AppBar>

            <SwipeableDrawer
                open={this.state.top}
                onClose={this.toggleDrawer('top', false)}
                onOpen={this.toggleDrawer('top', true)}
                anchor="top"
                >
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('top', false)}
                    onKeyDown={this.toggleDrawer('top', false)}
                >
                    {sideList}
                </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);

