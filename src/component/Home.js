import './Home.scss';
import ainizeIcon from '../image/ainize-logo.svg';
import githubIcon from '../image/git-hub-icon.svg';
import infoIcon from '../image/info-icon.svg';
import Search from './Search';
const Home = ({input, result, buttonVisible, setInput, search,setResult}) => {
    return(
        <div className="home">
            <div className="home__body">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt=""/>
                <div className="home__inputContainer">
                    <Search
                        input={input}
                        result={result}
                        buttonVisible={buttonVisible}
                        setInput={setInput}
                        search={search}
                        setResult={setResult}/>
                </div>
                <div className="home__footer">
                    <a href="" className="about">
                        <img src={infoIcon} alt="info"/>
                        About the project
                    </a>
                    <a href="" className="ainize">
                        <img src={ainizeIcon} alt="ainize"/>
                        Powered by Ainize
                    </a>
                    <a href="https://github.com/msh1273/Jina-project" className="github">
                        <img src={githubIcon} alt="github"/>
                        Contribute on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;