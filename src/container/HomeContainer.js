import React, {useState} from 'react';
import Home from '../component/Home';
import models from '../store/models.js'
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
const HomeContainer = (props,{hideButtons = false}) => {
    const history = useHistory();
    const [buttonVisible, setButtonVisible] = useState(hideButtons);


    const TextSearch = async (url, input ,top_k,rs=[]) =>{
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

    const appSearch =async (url,input,top_k,rs=[]) =>{
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
            console.log("app : ",response);
            let i;
            for(i=0;i<5;i++)
                rs[i]={"image": response["data"]["docs"][0]["matches"][i]["tags"]["Icon URL"],
                       "Genres" : response["data"]["docs"][0]["matches"][i]["tags"]["Genres"],
                       "URL" : response["data"]["docs"][0]["matches"][i]["tags"]["URL"],
                       "Name" : response["data"]["docs"][0]["matches"][i]["tags"]["Name"].substring(0,30),
                       "Rating" : Number(response["data"]["docs"][0]["matches"][i]["tags"]["Average User Rating"]).toFixed(1),
                        "Description" : response["data"]["docs"][0]["matches"][i]["text"]}
            console.log(rs);
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }

    const memeSearch =async (url,input,top_k,rs=[]) =>{
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
            console.log("meme : ", response);
            let i;
            for (i=0;i<10;i++)
                rs[i] = response["data"]["docs"][0]["matches"][i]["tags"]["image_url"];
                console.log(rs[i]);
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }


    const search =  async (e) => {
        let rs = [];
        let dic ={};
        let app_Array = [];
        let meme_Array = [];
        console.log("Search Component")
        e.preventDefault();
        history.push("/search");

        // window.location.href = `/search`
        setButtonVisible(false);
        console.log("You hit search", props.input);
        if (props.input.length > 0) {
            dic['wiki-sentence'] = null;
            dic['App-store'] = null;
            const wiki_model = models.modelData[0];
            const app_model = models.modelData[1];
            const meme_model = models.modelData[2];

            let wiki_url = wiki_model.modelUrl;
            let app_url = app_model.modelUrl;
            let meme_url = meme_model.modelUrl;
            setButtonVisible(true)
            await TextSearch(wiki_url, props.input, 20, rs);
            await appSearch(app_url, props.input,10,app_Array);
            await memeSearch(meme_url, props.input,15,meme_Array);
            dic['wiki-sentence'] = rs;
            dic['App-store'] = app_Array;
            dic['meme'] = meme_Array;
            props.setResult(dic);

        }
        };

        return (
                <Home
                    buttonVisible={buttonVisible}
                    search={search}
                />
        );
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);