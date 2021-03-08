
import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography
} from '@material-ui/core'

import FooterMenuItem from '../FooterMenuItem'
import FOOTER_MENU from 'utils/constants/footer-menu'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5, 0)
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1.5)
  }
}));

const FooterMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant='h5'
        color='primary'
        className={classes.title}
      >
        Menu
      </Typography>
      <Grid container>
        {
          FOOTER_MENU.map((menuItem, index) => (
            <Grid item key={index} xs={6} sm={12}>
              <FooterMenuItem
                menu={menuItem}
              />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default memo(FooterMenu);
