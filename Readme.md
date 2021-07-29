# Jina-search-demo

This is a demo to show how to use [Jina](https://github.com/jina-ai/jina/) framework. 

## Instructions
Nueral Search framework jina를 활용한 demo입니다. <br>
각 flow에 데이터셋 3000개를 인코딩헸습니다. 한번의 검색에 최대한 다양한 출력을 보여줄 수 있도록 만들었고, Related Image를 드래그해여 검색폼에 입력시에 관련 Text를 출력하도록 하였습니다. 

### Clone this repo

```shell
git clone https://github.com/ainize-team/jina-search.git
cd jina-search
```

### Create a virtual environment

We wouldn't want our project clashing with our system libraries, now would we?

```shell
virtualenv env --python=python3.8 # Python versions >= 3.7 work fine
source env/bin/activate
```

### Run the program

```shell
npm install
npm start
```

### Start the front end

Then open http://localhost:3000 in your browser

### What you can see
You can search Text to Text
<img src="./src/image/jina-front1.gif">
<br><br>
or you can also search Image to Text
<img src="./src/image/jina-front2.gif">

## How to make
각 jina flow는 jina example을 활용하여 만든부분도 있고, 직접 flow를 설계하여 만든 부분도 있습니다.
[jina example](https://github.com/jina-ai/examples) 
<br>
#### jina example 활용 모델 endpoint
cross-modal-search : https://main-jina-cross-modal-docker-msh1273.endpoint.ainize.ai <br>
wiki-people : https://master-jina-people-wiki-search-msh1273.endpoint.ainize.ai <br>
wikipedia sentences :https://main-wikipidia-senetence-msh1273.endpoint.ainize.ai <br>
App-store :https://main-jina-appstore-search-msh1273.endpoint.ainize.ai <br>
MEME : https://main-jina-meme-search-docker-msh1273.endpoint.ainize.ai <br>

web frontend는 react를 횔용하여 만들었습니다. 상태관리는 redux를 활용하였습니다.
