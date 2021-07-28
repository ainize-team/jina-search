import {connect} from "react-redux";
import * as actions from "../redux/loading/actions";
import {CircularProgress} from "@material-ui/core";
import './SearchPage.scss';
import loadingIcon from "../image/Ellipsis-1s-200px.svg"
const LoadingComponent = ({loading}) => {

    return (
        <>
            {loading === false ? "" :
            <div className="LoadingBackground">
                <div className="LoadingIcon">
                    <div className="iconArea">
                        <div className="loadingio-spinner-ellipsis-gwyrsnsuec">
                            <img src = {loadingIcon}/>
                        </div>

                    </div>
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
