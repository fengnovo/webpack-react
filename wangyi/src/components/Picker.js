import React, { PropTypes } from 'react'
// import '../img/netease.png'

const Picker = ({ value, onChange, options }) => (
  <div>
    <h1 style={{'display': 'none'}}>{value}</h1>
    <img style={{
      'border': 'none',
      'width': '16rem',
      'height': '3rem',
  
      'background': 'url(http://img2.cache.netease.com/f2e/news/index2016/images/sprite_img0803.png) no-repeat',
      'backgroundPosition':'.5rem .5rem'
  }}/>
      <select onChange={e => onChange(e.target.value)}
              value={value} style={{'width': '100%','marginTop':'1rem'}}>
        {options.map(option =>
          <option value={option} key={option}>
            {option}
          </option>)
        }
      </select>
  </div>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
