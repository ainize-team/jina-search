import React from 'react';
import SearchPage from "../component/SearchPage";
import models from "../store/models";
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";
import {setResult} from "../redux/results/actions";

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
            rs.push([]);
        }
    }

    const app_Search =async (url,input,top_k,rs=[]) =>{

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
                    "Description" : response["data"]["docs"][0]["matches"][i]["tags"]["Description"]}
            console.log(rs);
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }

    const meme_Search =async (url,input,top_k,rs=[]) =>{
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
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }

    const cross_Search =async (url,input,top_k,rs=[]) =>{
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
            console.log("cross : ", response);
            let i;
            for(i =0;i<top_k;i++)
                rs[i] = response["search"]["docs"][0]["matches"][i]["uri"]
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }
    const Textto_Search =async (url,input,top_k,rs=[]) =>{
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
            let i;
            for(i=0;i<top_k;i++)
                rs[i] = response["search"]["docs"][0]["matches"][i]["text"];
        }
        else {
            console.log("respone을 받지 못했습니다.");
        }
    }


    const search =  async (e) => {
        props.setResult({});
        setTimeout(function(){}, 3000);
        console.log(props.result);
        let rs = [];
        let dic ={};
        let app_Array = [];
        let meme_Array = [];
        let cross_Array = [];
        console.log("Search Component")
        e.preventDefault();

        const wiki_model = models.modelData[0];
        const app_model = models.modelData[1];
        const meme_model = models.modelData[2];
        const cross_model = models.modelData[3];

        let wiki_url = wiki_model.modelUrl;
        let app_url = app_model.modelUrl;
        let meme_url = meme_model.modelUrl;
        let cross_url = cross_model.modelUrl;

        if (props.input.length > 0 && !props.input.startsWith('data:image')) {
            await Text_Search(wiki_url, props.input, 20, rs);
            await app_Search(app_url, props.input,1,app_Array);
            await meme_Search(meme_url,props.input,10,meme_Array);
            await cross_Search(cross_url,props.input,15,cross_Array);
            dic['wiki-sentence'] = rs;
            dic['App-store'] = app_Array;
            dic['meme'] = meme_Array;
            dic['cross-modal'] = cross_Array;
            props.setResult(dic);
        }
        else {
            await Textto_Search(cross_url, props.input,15,cross_Array);
            dic['Textto'] = cross_Array;
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