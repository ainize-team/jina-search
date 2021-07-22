import React from "react";
import './Search.scss';
import sendIcon from '../image/send.svg'
import { Button } from "@material-ui/core";
import {connect} from "react-redux";
import * as actions from "../redux/inputs/actions"
import * as ractions from "../redux/results/actions"


const Search = ({buttonVisible,input,result,search,setInput}) => {

    const handleChangeInput = (event) => {
        setInput(event.target.value);
        console.log(input);

    }
    const handleDragover= (event) =>{
            event.preventDefault();
    }

    const handleDrop = (event) => {
        let dt = event.dataTransfer.getData('data');
        setInput(dt);
    }


    return (
        <form className="search" onSubmit={search}>
            <div className="search__input">
                <input value={input} onChange={(e) => handleChangeInput(e)} onDragOver={e=>handleDragover(e)} onDrop={e=>handleDrop(e)}/>
                <img src={sendIcon} onClick={search} alt="search"/>
            </div>

            {!buttonVisible ? (
                <div className="search__buttons">
                    <Button type="submit" onClick={search} variant="outlined">Jina Search</Button>
                    <Button variant="outlined" type="submit" onClick={search}>I'm Feeling Lucky</Button>
                </div>
            ) : (
                <div className="search__buttons">

                </div>
            )}
        </form>
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

export default connect(mapStateToProps,mapDispatchToProps)(Search);