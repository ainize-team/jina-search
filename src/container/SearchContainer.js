import React from 'react';
import SearchPage from "../component/SearchPage";
import models from "../store/models";
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";

const SearchContainer = (props) => {
    const Text_Search = async (url, input ,top_k,rs=[]) =>{
        const postResponse =  await fetch(url,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "top_k": top_k,
                    "mode": "search",
                    "data": [input]
                })
            })
        if (postResponse.status === 200) {
            const response = await postResponse.json();
            console.log(response)
            let qa = [];
            let i;
            for (i = 0; i < top_k; i++)
                qa[i] = (String(response["search"]["docs"][0]["matches"][i]["score"]["value"].toFixed(3))+" "+response["search"]["docs"][0]["matches"][i]["text"]
                );
            rs.push(qa);
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }

    const search =  async (e) => {
        let rs = [];
        let dic ={};
        console.log("Search Component")
        e.preventDefault();

        if (props.input.length > 0) {
            const model = models.modelData[0];
            let url = model.modelUrl;
            await Text_Search(url, props.input, 50, rs);
            dic['wiki-sentence'] = rs;
            console.log("response: ", rs);
            props.setResult(dic);
        }
    };

    return (
    <SearchPage
        search={search}
    />
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
        setResult : (result) =>{dispatch(ractions.setResult(result))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchContainer);