import {connect} from "react-redux";
import * as actions from "../redux/loading/actions";
import CircularProgress from "@material-ui/core";


const LoadingComponent = ({loading}) => {

    return (
        <>
            {loading === false ? "" :
            <div className="LoadingBackground">
                <div className="LoadingIcon">
                </div>
            </div>
            }
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        loading : state.loading.loading,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLoading : (loading) => {dispatch(actions.setLoading(loading))},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadingComponent);
