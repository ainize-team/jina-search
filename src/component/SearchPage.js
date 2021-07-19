import React from 'react';
import './SearchPage.scss';
import {Link} from 'react-router-dom';
import Search from "./Search"
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";

const SearchPage = ({input, result,search,setInput,setResult}) => {
  return (
    <div className="searchPage">

      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>

        <div className="searchPage__headerbody">
          <Search buttonVisible="true"
                  search={search}
          />
        </div>
      </div>
      <div>


      </div>
        <div>
            {result['wiki-sentence'] ? (<div className="search__result">
                {result['wiki-sentence'][0].map(factor => {
                        return (<li>
                            {factor}
                        </li>)
                    }
                )}
            </div>) : null}
        </div>
    </div>


  )
}

const mapStateToProps = (state) =>{
  return {
    input: state.inputs.input,
    result: state.results.result
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInput : (input) => {dispatch(actions.setInput(input))},
    setResult : (result) => {dispatch(ractions.setResult(result))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);