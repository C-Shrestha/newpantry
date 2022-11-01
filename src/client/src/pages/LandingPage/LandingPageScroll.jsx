import Fullpage, {FullPageSections, FullpageSection, FullpageNavigation} from '@ap.cx/react-fullpage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import './LandingPageScroll.css';
import React from 'react';


const LandingPageScroll = () => {
    return (
        <Fullpage>
            <FullpageNavigation></FullpageNavigation>
            <FullPageSections>
                <FullpageSection>
                    <div className="home">
                        <button type="button"><a href="/login">Login</a></button>
                        <img src="/Pantry.png" alt="pantry icon" />
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="middle">
                        <div className="cans">
                            <img id="two" src="/cans.png" alt="cans" />
                        </div>
                        <h1>Organize</h1>
                        <text>store the food in your pantry in digital lists for<br /> ease of access</text>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="middle">
                        <div className="cans">
                            <img id="one"src="/plan.png" alt="clipboard and pencil" />
                        </div>
                        <h1>Plan</h1>
                        <text>search for recipes and save your favorites in your<br /> personalized portal</text>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="middle">
                        <div className="cans">
                            <img id="one"src="/cook.png" alt="cooking" />
                        </div>
                        <br/><br/><br/>
                        <h1>Cook</h1>
                        <text>make delcious dishes from our extensive<br /> collection of over 200 global recipes</text>
                    </div>  
                </FullpageSection>
                <FullpageSection>
                    <div className="home">
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <text>Create an account to get started</text>
                        <div className="signupbtn">
                            <button id="signup"type="button"><a href="/signup">Sign Up</a></button>
                        </div>
                    </div>
                </FullpageSection>
                <FullpageSection>
                    <div className="download">
                        <br/><br/><br/><br/><br/><br/><br/>
                        <text>Download our mobile app</text>
                        <div className="mobile">
                            <div className="mobile-item1">
                                <div className="mobile-item color1">
                                    <button type="button"><FontAwesomeIcon icon={faApple} transform="grow-10 left-5" /> Available<br /> on App Store</button>
                                </div>
                                <div className="mobile-item color2">
                                    <button type="button"><FontAwesomeIcon icon={faAndroid} transform="grow-7 left-5" /> Avaiable<br />on Play Store</button>
                                </div>
                            </div>
                            <div className="mobile-item">
                                <img src="/mobile.png" alt="phone app"></img>
                            </div>
                        </div>
                    </div>
                </FullpageSection>  
            </FullPageSections>
        </Fullpage>
    )
};

export default LandingPageScroll;