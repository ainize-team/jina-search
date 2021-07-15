import React, {useState} from 'react';
import Home from '../component/Home';
import models from '../store/models.js'
import modelsearch from "../ModelSearch";
const HomeContainer = ({hideButtons = false}) => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
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
            throw "respone을 받지 못했습니다.";
        }
    }



    const search =  async (e) => {
        let rs = [];
        e.preventDefault();
        window.location.href = `/search?p=$`
        console.log("You hit search", input);
        if (input.length > 0) {
            const model = models.modelData[0];
            let url = model.modelUrl;
            setButtonVisible(true)
            await TextSearch(url, input, 50, rs);
            console.log("response: ", rs)
            setResult(rs)
        }
        };
        return (
            <Home
                input={input}
                result={result}
                buttonVisible={buttonVisible}
                setInput={setInput}
                search={search}
            />
        );
    }
export default HomeContainer;