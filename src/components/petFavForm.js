import React , { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import axios from 'axios'

// pet Favourite categories
const categories = [
  {
    value: 'Treat',
    label: 'Treat',
  },
  {
    value: 'Toy',
    label: 'Toy',
  },
  {
    value: 'Park',
    label: 'Park',
  },
  {
    value: 'Vet',
    label: 'Vet',
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',
  },
  menu: {
    width: 200,
  },
  buttonStyles: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '80%',
    paddingTop: '2em'
  },
  formStyle: {
    width:'100%',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '2em'
  },
  largeButton: {
    transform: 'scale(1.8)'
  }
}));

export default function PetFavForm(props) {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [favourite, setFavourite] = useState('')

  const onSubmit = function (evt) {
    evt.preventDefault()
    sumbitPetFav()
  }

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };
  const sumbitPetFav = function() {
    
  }


  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={onSubmit}>
      <div className={classes.formStyle}>
        <TextField
          id="category"
          select
          label="Category"
          className={classes.textField}
          value={category}
          onChange={handleCategoryChange}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          id="standard-basic" 
          className={classes.textField} 
          label="Favourite"
          value={favourite}
          onChange={setFavourite}/>
        <div className="buttons" className={ classes.buttonStyles }>
        <CancelOutlinedIcon className={classes.largeButton} onClick={() => props.setShowPetFavForm(true)}/>
        <CheckCircleOutlineRoundedIcon className={classes.largeButton} onClick={() => props.setShowPetFavForm(true)}/>
        </div>

      </div>
    </form>
  );
}
