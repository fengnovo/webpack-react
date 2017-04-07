import Select from '../components/Select'
import { SELECT } from '../actions'
import { dispatch } from 'redux'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onclick: (tab)=> {
            dispatch(SELECT(tab))
        }
    }
}

connect(
    mapStateToProps,
    mapDispatchToProps
)(SELECT)

export default Footer