import React from "react";
import './Search.scss';
import sendIcon from '../image/send.svg'
import { Button } from "@material-ui/core";

const Search = ({input, result, buttonVisible, setInput, search,setResult}) => {
    const handleChangeInput = (event) => {
        setInput(event.target.value);
    }
    const handleReset = () => {
        setResult([])
    }


    return (
        <form className="search">
            {/* <SearchBox/> */}
            <div className="search__input">
                <input value={input} onChange={(e) => input.length >= 0 ? handleChangeInput(e):handleReset()} />
                <img src={sendIcon} onClick={search} alt="search"/>
            </div>
            {result ? (<div className="search__result">
                {result}
            </div>) : null}
            {!buttonVisible ? (
                <div className="search__buttons">
                    <Button type="submit" onClick={search} variant="outlined">Google Search</Button>
                    <Button variant="outlined" type="submit" onClick={search}>I'm Feeling Lucky</Button>
                </div>
            ) : (
                <div className="search__buttons">

                </div>
            )}
        </form>
    )
}

export default Search;