import React, { Component } from "react";
import './videoPage.css';
import videojs from "video.js";

interface MyComponentState {
    isPlaying: boolean;
    playedSeconds: any
    remainingVideoPlay: any
    totalDuration: any
    showButton: boolean; // New state variable
}

class VideoJSPlayerComponent extends Component<{}, MyComponentState>{

    player: any;
    videoNode: any;
    videoJsOptions = {
        autoplay: false,    
        muted: true,
        height: 450,
        width: 800,
        controls: true,
        sources: [
            {
                src: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
                type: "video/mp4"
            }
        ],
    };

    constructor(props: any) {
        super(props);
        this.state = {
            isPlaying: false,
            playedSeconds: 0,
            remainingVideoPlay: 0,
            totalDuration: 0,
            showButton: false, // Initialize showButton state
        };

    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.videoJsOptions, () => {
            if (this.player) {

                // Triggered
                console.log('onPlayerReady');

                // this.player.on('play', (event: any) => {
                //     this.setState({
                //         isPlaying: true,
                //     })
                // })
                // this.player.on('loadedmetadata', (event: any) => {
                //     // @ts-ignore
                //     this.setState({ totalDuration: this.player.duration() })
                // })
                // this.player.on('pause', (event: any) => {
                //     this.setState({
                //         isPlaying: false,
                //     })
                // })
                // this.player.on('ended', (event: any) => {
                //     console.log("ended")
                // })
                // this.player.on('timeupdate', (event: any) => {
                //     // @ts-ignore
                //     this.setState({ playedSeconds: this.player.currentTime() })
                //     // @ts-ignore
                //     this.setState({ remainingVideoPlay: this.player.remainingTime() })
                // })
                // this.player.on('timeupdate', (event: any) => {
                //     // Update the state based on elapsed time
                //     const currentTime = this.player.currentTime();
                //     this.setState({ playedSeconds: currentTime });

                //     if (currentTime >= 20) {
                //         this.setState({ showButton: true }); // Show button after 20 seconds
                //     }
                // });

            }
        });
    }

    play = () => {
        if (this.player) {
            this.player.play();
        }
    }

    pause = () => {
        if (this.player) {
            this.player.pause();
        }
    }

    forwardVideo = () => {
        if (this.player) {
            this.player.currentTime(this.player.currentTime() + 10);
        }
    }

    backwardVideo = () => {
        if (this.player) {
            this.player.currentTime(this.player.currentTime() - 10);
        }
    }

    jumpTo = () => {
        if (this.player) {
            this.player.currentTime(55);
        }
    }

    togglePlay = () => {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    secondsToHms = (secs: any) => {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = Math.floor(secs % 60);
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    };
    customButtonAction = () => {
        // Define the action you want the custom button to perform
        // For example, you can display an alert when the button is clicked
        alert("Custom button clicked!");
    }


    render() {
        const { totalDuration, playedSeconds, remainingVideoPlay, isPlaying ,showButton} = this.state;
        return (
            <div className="playerWrapper">
                <div className="customVideoPlayer">
                    <video
                        id='video'
                        ref={node => (this.videoNode = node)}
                        className="video-js vjs-default-skin  vjs-big-play-centered "
                    // data-setup='{ "poster": "assets/logo.png"}'
                    />
                     {showButton && (
                        <img alt="" src="assets/control.png"
                            className="customButton cursor-pointer"
                            onClick={this.customButtonAction}
                        >
                           
                        </img>
                    )}
                    <img src="assets/logo.png" alt="Logo" className="logo" />
                </div>
             
                <hr />
                {/* <div>
                    <div>
                        Played Time: {this.secondsToHms(playedSeconds)}
                    </div>
                    <div>
                        Total Time: {this.secondsToHms(totalDuration)}
                    </div>
                    <div>
                        Remaining Time: {this.secondsToHms(remainingVideoPlay)}
                    </div>
                </div>
                <br />
                <div className="d-flex">
                    <button className="btn btn-danger btn-sm" onClick={this.togglePlay}>{isPlaying ? "Pause" : "Play"}</button>&nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.jumpTo}>Play from 55th second</button>&nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.forwardVideo}>10 secs +</button>&nbsp;
                    <button className="btn btn-danger btn-sm" onClick={this.backwardVideo}>10 secs -</button>
                </div> */}
            </div>
        );
    }
}

export default VideoJSPlayerComponent;