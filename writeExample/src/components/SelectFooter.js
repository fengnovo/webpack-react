import React from 'react'
import Footer from '../contains/Footer'


//选项
const SelectFooter = () => {
    return <p>
        选项：<br/>
        <Footer filter="ALL">全部</Footer>{ '，' }
        <Footer filter="ACTIVE">未完成</Footer>{ '，' }
        <Footer filter="COMPLETED">已完成</Footer>{ '  ' }
    </p>
}

export default SelectFooter