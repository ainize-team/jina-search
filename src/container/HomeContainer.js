import React, {useState} from 'react';
import Home from '../component/Home';
import models from '../store/models.js'
import * as actions from "../redux/inputs/actions";
import * as ractions from "../redux/results/actions";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import * as Loading_action from "../redux/loading/actions"

const fetch = require('node-fetch');
const AbortController = require('abort-controller');

const TIMEOUT = 15000;

const HomeContainer = (props,{hideButtons = false}) => {
    const history = useHistory();
    const [buttonVisible, setButtonVisible] = useState(hideButtons);

    const TextSearch = async (url, input ,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);

        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    signal: controller.signal,
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
                rs=null;
            }
        } catch (e) {
            console.log("Text_Search respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }

    const appSearch =async (url,input,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);
        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    signal: controller.signal,
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
                for(i=0;i<top_k;i++)
                    rs[i]={"image": response["data"]["docs"][0]["matches"][i]["tags"]["Icon URL"],
                        "Genres" : response["data"]["docs"][0]["matches"][i]["tags"]["Genres"],
                        "URL" : response["data"]["docs"][0]["matches"][i]["tags"]["URL"],
                        "Name" : response["data"]["docs"][0]["matches"][i]["tags"]["Name"].substring(0,30),
                        "Rating" : Number(response["data"]["docs"][0]["matches"][i]["tags"]["Average User Rating"]).toFixed(1),
                        "Description" : response["data"]["docs"][0]["matches"][i]["tags"]["Description"]}
            }
            else {
                console.log("respone을 받지 못했습니다.");
                rs=null;
            }
        } catch (e) {
            console.log("app_Search respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }

    const memeSearch =async (url,input,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);
        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "top_k": top_k,
                        "mode": "search",
                        signal: controller.signal,
                        "data": [input]
                    })
                })
            if (postResponse.status === 200) {
                const response = await postResponse.json();
                console.log("meme : ", response);
                let i;
                for (i=0;i<15;i++)
                    rs[i] = response["data"]["docs"][0]["matches"][i]["tags"]["image_url"];
            }
            else {
                console.log("respone을 받지 못했습니다.");
                rs=null;
            }
        } catch (e) {
            console.log("meme_Search respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }

    const crossSearch =async (url,input,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);
        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    signal: controller.signal,
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
                for(i =0;i<15;i++)
                    rs[i] = response["data"]["docs"][0]["matches"][i]["uri"]
            }
            else {
                console.log("respone을 받지 못했습니다.");
                rs=null;
            }
        } catch (e) {
            console.log("cross_Search respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }
    const TexttoSearch =async (url,input,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);
        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "top_k": top_k,
                        "mode": "search",
                        signal: controller.signal,
                        "data": [input]
                    })
                })
            if (postResponse.status === 200) {
                const response = await postResponse.json();
                let i;
                for(i=0;i<15;i++)
                    rs[i] = response["data"]["docs"][0]["matches"][i]["text"];
            }
            else {
                console.log("respone을 받지 못했습니다.");
                rs=null;
            }
        } catch (e) {
            console.log("Textto_Search respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }
    const peopleSearch =async (url,input,top_k,rs=[]) =>{
        const controller = new AbortController();
        const timeout = setTimeout(() => {
            controller.abort();
        }, TIMEOUT);
        try {
            const postResponse =  await fetch(url,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "top_k": top_k,
                        "mode": "search",
                        signal: controller.signal,
                        "data": [input]
                    })
                })
            if (postResponse.status === 200) {
                const response = await postResponse.json();
                let i;
                for(i=0;i<5;i++){
                    rs[i] = {
                        "URI" : response["data"]["docs"][0]["matches"][i]["tags"]["URI"].replace(/\"/g,'').substring(1,response["data"]["docs"][0]["matches"][i]["tags"]["URI"].length-1),
                        "name" : response["data"]["docs"][0]["matches"][i]["tags"]["name"].replace(/\"/g,''),
                        "text" : response["data"]["docs"][0]["matches"][i]["tags"]["text"]
                    }
                }
                console.log("wiki people : ",rs);
            }
            else {
                console.log("respone을 받지 못했습니다.");
                rs=null;
            }
        } catch (e) {
            console.log("people respone을 받지 못했습니다.");
            rs=null;
        } finally {
            clearTimeout(timeout);
        }
    }

    const search =  async (e) => {

        let rs = [];
        let dic ={};
        let app_Array = [];
        let meme_Array = [];
        let cross_Array = [];
        let people_Array =[];
        console.log("Search Component")
        e.preventDefault();
        history.push("/search");
        props.setResult({});
        // window.location.href = `/search`
        setButtonVisible(false);
        const wiki_model = models.modelData[0];
        const app_model = models.modelData[1];
        const meme_model = models.modelData[2];
        const cross_model = models.modelData[3];
        const people_model = models.modelData[4];

        let wiki_url = wiki_model.modelUrl;
        let app_url = app_model.modelUrl;
        let meme_url = meme_model.modelUrl;
        let cross_url = cross_model.modelUrl;
        let people_url = people_model.modelUrl;

        console.log("You hit search", props.input);


        if (props.input.length > 0 && !props.input.startsWith('data:image')) {
            dic['wiki-sentence'] = null;
            dic['App-store'] = null;
            dic['cross-modal'] = null;
            dic['meme'] = null;
            dic['people'] = null;

            setButtonVisible(true)
            props.setLoading(true);
            await Promise.all([
                TextSearch(wiki_url, props.input, 20, rs),
                appSearch(app_url, props.input,15,app_Array),
                memeSearch(meme_url, props.input,15,meme_Array),
                crossSearch(cross_url,props.input,3, cross_Array),
                peopleSearch(people_url, props.input,15,people_Array)
            ])

            dic['wiki-sentence'] = rs;
            dic['App-store'] = app_Array;
            dic['meme'] = meme_Array;
            dic['cross-modal'] = cross_Array;
            dic['people'] = people_Array;
            props.setLoading(false);
            props.setResult(dic);
        }
        else {
            props.setLoading(true);
            await TexttoSearch(cross_url,props.input,15, cross_Array);
            dic['Textto'] = cross_Array;
            props.setLoading(false);
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
        result: state.results.result,
        loading: state.loading.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInput : (input) => {dispatch(actions.setInput(input))},
        setResult : (result) =>{dispatch(ractions.setResult(result))},
        setLoading: (loading) =>{dispatch(Loading_action.setLoading(loading))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);