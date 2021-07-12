import React, {useState} from 'react';
import Home from '../component/Home';
import models from '../store/models.js'
const HomeContainer = ({hideButtons = false}) => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [buttonVisible, setButtonVisible] = useState(hideButtons);

    const search = async (e) => {
        let rs = [];
        e.preventDefault();
        // window.location.href = "/search"
        console.log("You hit search", input);

        const model = models.modelData[0];
        let url = model.modelUrl;

        setButtonVisible(true)

        const postResponse = await fetch(url,
            {method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    "top_k": 50,
                    "mode": "search",
                    "data": [input]
                })
            })
        if (postResponse.status === 200) {
            const response = await postResponse.json();
            console.log(response["search"]["docs"][0])
            let qa = "";
            var i;
            for (i=0;i<50;i++)
            qa += response["search"]["docs"][0]["matches"][i]["text"];

            rs.push(qa);

            console.log(qa)
            setResult(qa);
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
            setResult={setResult}
        />
    );
}
export default HomeContainer;