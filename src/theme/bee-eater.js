import { createMuiTheme } from '@material-ui/core/styles';
import { dark } from '@material-ui/core/styles/createPalette';

const palette = { 
    type: 'dark',
    primary: { main: '#FBC02D' } ,
    typography: {
        useNextVariants: true,
    },
    
};
const themeName = 'Lightning Yellow Razzmatazz Bee-eater';

export default createMuiTheme({ 
    palette, 
    themeName 
});
