
const reducer = (state = 'GO', action) => {
  switch(action.type) {
     case 'GO':
        state = 'GO'
        break;
 
     case 'STOP':
        state = 'STOP'
        break;
 
     case 'CAUTION':
        state = 'CAUTION';
        break;
  }
  return state;
}

export  {reducer };