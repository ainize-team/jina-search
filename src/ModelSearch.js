import models from "./store/models";

const tag = "[ModelSearch]";

class ModelSearch {
    constructor() {
        console.log(tag, "constructor")

    }

    // async TextSearch(url, input, topk) {
    //    const postResponse = await fetch(url,
    //         {
    //             method: "POST",
    //             headers: {"Content-Type": "application/json"},
    //             body: JSON.stringify({
    //                 "top_k": topk,
    //                 "mode": "search",
    //                 "data": [input]
    //             })
    //         })
    //     if (postResponse.status === 200) {
    //         const response = await postResponse.json();
    //         console.log(response["search"]["docs"][0])
    //
    //         return response;
    //     }
    //     else {
    //         return "";
    //     }
    // }
}

const modelsearch = new ModelSearch();
export default modelsearch;