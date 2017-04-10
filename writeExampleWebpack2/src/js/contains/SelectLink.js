import { connect } from 'react-redux'
import Link from '../components/Link'
import { SELECTFILITER } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.SelectFilterReducer
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