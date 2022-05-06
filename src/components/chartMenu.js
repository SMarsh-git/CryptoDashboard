import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ChartMenu() {
  const classes = useStyles();
  const [chartOne, setChartOne] = React.useState('');
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">bitcoin</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={chartOne}
          onChange={(event) => setChartOne(event.target.value)}
        >
          <MenuItem value="bitcoin">
            <em>crypto</em>
          </MenuItem>
          <MenuItem value={"bitcoin"}>BTC</MenuItem>
          <MenuItem value={"ethereum"}>ETH</MenuItem>
          <MenuItem value={"cake-monster"}>MONSTA</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
