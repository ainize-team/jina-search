import React from 'react';
import './SearchPage.scss';
import {Link} from 'react-router-dom';
import Search from "./Search"
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";

const SearchPage = ({input, result,search,setInput,setResult}) => {
  const handleDrag = (e) => {
    e.dataTransfer.setData('data',e.target.src);
  }

return (
  <div className="searchPage">

    <div className="searchPage__header">
      <Link to="/">
        <img
          className="searchPage__logo"
          src="https://lever-client-logos.s3.us-west-2.amazonaws.com/4347e16d-b068-4137-be7c-fedb5d3d7a9a-1612287646627.png"
          alt=""
        />
      </Link>

      <div className="searchPage__headerbody">
        <Search buttonVisible="true"
                search={search}
        />
      </div>
    </div>

      <div className="Model-result">
        {result['Textto'] ? (<h1 className="model-Title"><img src="https://img.icons8.com/color/48/000000/image.png" className="icon"/>Image to Text</h1> ) : null}
        {result['Textto'] ? (<div className="search__result">
          {result['Textto'].map(factor => {
            return (
                <li className="wiki-sentence">
                  {factor}
                </li>
            )
          })}

        </div> ) : null}


        {result['cross-modal'] ? (<h1 className="model-Title"><img src="https://img.icons8.com/color/48/000000/image.png" className="icon"/>Related Image</h1> ) : null}
        {result['cross-modal'] ? (<div className="cross_result">
          {result['cross-modal'].map(factor => {
            return (
            <img className="cross_image" src={factor} onDragStart={(e) => handleDrag(e)}/>
            )
          })}

        </div> ):null}



        {result['wiki-sentence'] ? (
            <h1 className="model-Title"><img src="https://img.icons8.com/ios/50/000000/wikipedia.png" className="icon"/>Related Wikipedia sentences </h1>
        ) : null}

          {result['wiki-sentence'] ? (<div className="search__result">
              {result['wiki-sentence'][0].map(factor => {
                      return (<li className="wiki-sentence">
                          {factor}
                      </li>)
                  }
              )}
          </div>) : null}
        {result['App-store'] ? (<h1 className="model-Title"><img src="https://img.icons8.com/ios-filled/64/000000/app-symbol.png" className='icon'/> APP STORE </h1>) : null}
        {result['App-store'] ? (<div className="app_result">
          {result['App-store'].map(factor=> {
            return (
                <div className="App-container">
                  <a href={factor["URL"]}>
                    <img className="Image-name" src={factor['image']} />
                  </a>
                  <div className="App-name">
                    Name : {factor['Name']}
                  </div>
                  <div className="App-Rating">
                    Rating : {factor['Rating']}
                  </div>
                  <div className="App-Genre">
                    Genre : {factor['Genres']}
                  </div>
             </div>
            )
          })}
        </div>) : null}
        {result['meme'] ? (<h1 className="model-Title"><img src="https://img.icons8.com/dusk/64/000000/futurama-zapp-brannigan.png" className='icon'/>  MEME </h1>) : null}
        {result['meme'] ? (<div className="meme_result">
          {result['meme'].map(factor => {
            return (
                  <img className="meme-image" src={factor}/>
            )
          })}
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