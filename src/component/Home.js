import './Home.scss';
import ainizeIcon from '../image/ainize-logo.svg';
import githubIcon from '../image/git-hub-icon.svg';
import infoIcon from '../image/info-icon.svg';
import Search from './Search';
const Home = ({buttonVisible, search,loading}) => {
    return(
        <div className="home">
            <div className="home__body">
                <img src="https://lever-client-logos.s3.us-west-2.amazonaws.com/4347e16d-b068-4137-be7c-fedb5d3d7a9a-1612287646627.png" alt=""/>
                <div className="home__inputContainer">
                    <Search
                        buttonVisible={buttonVisible}
                        search={search}
                        loading={loading}
                        />
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