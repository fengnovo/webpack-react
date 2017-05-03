import React, { PropTypes } from 'react'
/*
<Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
*/
const Picker = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map(option =>
        <option value={option.a} key={option.a}>
          {option.t}
        </option>)
      }
    </select>
  </span>
) 

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
