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
            let qa = "";
            let i;
            for (i = 0; i < top_k; i++)
                qa += response["search"]["docs"][0]["matches"][i]["text"];

            rs.push(qa)
        }
    }

    const search =  (e) => {
        let rs = [];
        e.preventDefault();
        // window.location.href = "/search"
        console.log("You hit search", input);
        if (input.length > 0) {
            const model = models.modelData[0];
            let url = model.modelUrl;
            setButtonVisible(true)
            TextSearch(url, input, 50, rs);
                console.log("response: ", rs[0])

        setResult(rs)
        }
            // Show the result
            // let result = await gpt3.getSnippetPrediction(input)
            // console.log(result.data.answer)
            // setResult(result.data.answer)
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