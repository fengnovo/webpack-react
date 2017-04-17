import React from 'react'
import SelectLink from '../contains/SelectLink'

const Footer = () => (
    <p>
        <span>筛选</span><br />
        全部: {' '} <SelectLink filter="ALL">ALL</SelectLink>{', '}
        未完成: {' '} <SelectLink filter="ACTIVE">ACTIVE</SelectLink>{', '}
        已完成: {' '} <SelectLink filter="COMPLETED">COMPLETED</SelectLink>
    </p>
)

export default Footer