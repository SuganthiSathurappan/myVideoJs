import React, { Component } from "react";
import 'video.js/dist/video-js.css';
// City
import '@videojs/themes/dist/city/index.css';

import './videojs.css'
import videojs from "video.js";
import Modal from "../common/modal";
import ChildrenModal from "../video_js/childrenModal"
import { Button } from "@material-tailwind/react";
import FormModal from "./formModal";

interface MyComponentState {
    videoSrc: string;
    showImage: boolean; // New state variable
    isModalOpen: boolean;
    isFormModal: boolean;
    allowModalToOpen: boolean;
}

export default class VideoPlayer extends Component<{}, MyComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            videoSrc: 'assets/source1.mp4',
            showImage: false, // Initialize showImage as false
            isModalOpen: false,
            isFormModal: false,
            allowModalToOpen: true,
        };
    }

    player: any;
    videoNode: any;
    videoRef: any;
    videoJsOptions: any = {};
    temp = 1

    componentDidMount() {
        this.videoJsOptions = {
            autoplay: true,
            controls: true,
            height: 500,
            width: 800,
            sources: [{
                src: this.state.videoSrc,
                type: 'video/mp4',
            }],
        };
        // Reference to the video node
        this.videoNode = this.videoRef;

        // Initialize the video player
        this.player = videojs(this.videoNode, this.videoJsOptions, () => {
            if (this.player) {
                // Triggered
                console.log('onPlayerReady');
                console.log(this.temp)
                this.player.on("timeupdate", () => {

                    if (this.player.currentTime() >= 20 && this.player.currentTime() < 50) {
                        if (this.temp === 1) {
                            // this.setState({ showImage: true });
                            this.setState({ isFormModal: true });
                            this.player.pause()
                            this.temp = 2
                        }
                    }

                    if (this.player.currentTime() >= 50 && this.player.currentTime() < 55) {
                        this.setState({ isFormModal: false });
                        console.log(this.temp)
                        if (this.temp === 2) {
                            if (this.player.play()) {
                                this.player.pause();
                                this.temp = 3
                            }
                            this.setState({ allowModalToOpen: true });
                            this.setState({ isModalOpen: true });
                        }

                    }
                });
            }
        })
    }

    componentWillUnmount() {
        // Dispose of the video player to prevent memory leaks
        if (this.player) {
            this.player.dispose();
        }
    }

    setVideoSrcUrl = (src: any, isOpen: any) => {
        console.log("isOpen --- ", isOpen)
        console.log("src --- ", src)
        // Define the action you want the custom button to perform
        // if (this.player.paused()) {
            this.player.play();
            this.player.src(src);
        // } else {
        //     this.player.pause();
        // }
        this.setState({ isFormModal: false });
        if (!isOpen) {
            this.setState({ allowModalToOpen: false });
        }
        // // For example, you can display an alert when the button is clicked
        // alert("Custom button clicked!");

    }

    setIsOpen = (isOpen: any) => {
        console.log("isOpen --- ", isOpen)
        this.setState({ isFormModal: isOpen });
        this.setState({ isModalOpen: isOpen });

        // If the modal is being closed, set allowModalToOpen to false
        if (!isOpen) {
            this.setState({ allowModalToOpen: false });
        }

        if (this.player.paused()) {
            this.player.play();
        }
    }

    closeModal = () => {

        this.setState({ isFormModal: false })
        this.setState({ isModalOpen: false })
        if (this.player.paused()) {
            this.player.play();
        }
    };


    render() {
        const { showImage, isModalOpen, isFormModal, allowModalToOpen } = this.state;
        return (
            <>
                <div className="mt-10">
                    <p className="text-center text-xl font-semibold">Custom Video Player in ReactJs</p>
                    <div data-vjs-player >
                        <img src="assets/techtistLogo1.jpg" alt="Your Logo" className="pt-1 custom-logo" />
                        <video
                            ref={node => (this.videoRef = node)}
                            className="video-js vjs-theme-city"
                        // poster="assets/techtistLogo.jpg"
                        />
                        {/* {showImage && (
                            <img alt="" src="assets/poster.png"
                                className="customButton cursor-pointer"
                                onClick={this.customButtonAction}
                            >
                            </img>
                        )} */}
                    </div>
                </div>
                <Modal isOpen={isFormModal && allowModalToOpen} onClose={this.closeModal}>
                    <FormModal setIsFormModalOpen={this.closeModal} setVideoSrcUrl={this.setVideoSrcUrl} />
                </Modal>

                <Modal isOpen={isModalOpen && allowModalToOpen} onClose={this.closeModal}>
                    <ChildrenModal setIsModalOpen={this.setIsOpen} />
                </Modal>
            </>
        );
    }
    // render() {
    //     return (
    //         <div className="">
    //             <video
    //                 className="video-js vjs-layout-large"
    //                 controls src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" />
    //         </div>
    //     )
    // }
}
