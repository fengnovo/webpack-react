import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps,state); //注意前后state变化
    // {
    //     todos: [],
    //     visibilityFilter: "SHOW_ACTIVE"
    // }
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}

// const mapDispatchToProps = {
//     onClick: setVisibilityFilter.bind('SHOW_ACTIVE')
//         // dispatch(setVisibilityFilter(ownProps.filter))
//         // setVisibilityFilter('SHOW_ACTIVE');
//     // }
// }

// 上面是简写，下面用()包起来是表示{}是返回一个对象，而不是函数体
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log(ownProps.filter);
        dispatch(setVisibilityFilter(ownProps.filter))
    }
})

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)


/*const Link = ({active, children, onClick}) => {   
    //一开始组件的<FilterLink filter="SHOW_ALL">，state里面visibilityFilter的值是'SHOW_ALL'
    if(active) {
        return <span>{children}</span>
    }
    return (
        <a href = "#"
            onClick = {e => {
                e.preventDefault();
                onClick();
            }}>
            { children }
        </a>
    )
}*/

export default FilterLink
