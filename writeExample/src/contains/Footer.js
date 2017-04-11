import Select from '../components/Select'
import { SELECTFILITER } from '../actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'

/*
{
    TodosReducer,
    SelectFilterReducer
}
*/

const mapStateToProps = (state,ownProps) => {      //state才是那棵状态树
    return {
        active: state.SelectFilterReducer === ownProps.filter
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onclick: (tab)=> {
            dispatch(SELECTFILITER(tab))
        }
    }
}

const Footer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Select)

export default Footer