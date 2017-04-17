import { connect } from 'react-redux'
import Link from '../components/Link'
import { SELECTFILITER } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.SelectFilterReducer
        //active是用于显示正在显示的选项
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(SELECTFILITER(ownProps.filter))
        }
    }
}


const SelectLink = connect(
    mapStateToProps, 
    mapDispatchToProps
)(Link)

export default SelectLink