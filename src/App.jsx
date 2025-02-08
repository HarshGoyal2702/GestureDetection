import './App.css'
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { drawHand } from "./utilities"
import React, { useRef, useState } from 'react'
import userImage from "./assets/noUser.png"
import * as fp from "fingerpose"
import { oneGesture, twoGesture, threeGesture, fourGesture, fiveGesture } from "./gestures";
import { noUser, number1, number2, number3, number4, number5, thumbsUp } from "./assets";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [gestureName, setGestureName] = useState("Nothing to Detect");
  const [detectIndication, setDetectIndication] = useState("Detecting");
  const [something, setSomething] = useState(true);
  const [image, setImage] = useState(null);

  const runHandpose = async () => {
    try {
      const net = await handpose.load();
      console.log('Handpose model loaded.');

      setSomething(false); // Update UI state

      // Wait for the UI to re-render before starting detection
      setInterval(() => {
        detect(net);
      }, 500);
    } catch (error) {
      console.error("Error loading Handpose model:", error);
    }
  };


  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      // setGestureName("Hand Detected");
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          oneGesture,
          twoGesture,
          threeGesture,
          fourGesture,
          fiveGesture,
          // fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture
        ]);

        const gesture = await GE.estimate(hand[0].landmarks, 8);
        console.log(gesture);
        setDetectIndication("Detected Gesture");

        if (gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => (p.confidence > c.confidence ? p : c));
          if (maxConfidenceGesture.name == "thumbs_up") {
            console.log("thumbs up ki iamge h ye ");
            setImage(thumbsUp);
          }
          if (maxConfidenceGesture.name == "one") {
            console.log("one ki iamge h ye ");
            setImage(number1);
          }
          if (maxConfidenceGesture.name == "two") {
            console.log("two ki iamge h ye ");
            setImage(number2);
          }
          if (maxConfidenceGesture.name == "three") {
            console.log("two ki iamge h ye ");
            setImage(number3);
          }
          if (maxConfidenceGesture.name == "four") {
            console.log("two ki iamge h ye ");
            setImage(number4);
          }
          if (maxConfidenceGesture.name == "five") {
            console.log("two ki iamge h ye ");
            setImage(number5);
          }
          console.log("Detected Gesture:", maxConfidenceGesture.name);
          setGestureName(maxConfidenceGesture.name);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }
  // runHandpose();


  return (
    <>

      <div className="App">
        <header className="App-header" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          position: "relative"
        }}>
          <div style={{
            position: "relative",
            width: "80%",
            height: "80%",
            borderRadius: "20px",
            maxWidth: "640px",
            aspectRatio: "4/3",
            display: "flex",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{ position: "absolute", right: 10, top: 100,width:"100px" }}>
              <img src={image} style={{width:"100%"}} alt="detected Image" />
            </div>

            {
              something ? <img src={userImage} alt="ye image h" /> : <Webcam ref={webcamRef} style={{
                width: "100%",
                height: "100%",
                // borderRadius: "10px"
              }} />
            }


            <canvas ref={canvasRef} style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 10,
              // backgroundColor:"red"
            }} />

            <h3 style={{
              position: "absolute",
              bottom: "10px",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "clamp(12px, 2vw, 18px)",
              textAlign: "center",
              width: "80%"
            }}>
              {
                something ? <button onClick={runHandpose()}>start Detection</button> : `${detectIndication} - ${gestureName}`
              }
            </h3>
          </div>
        </header>
      </div>

    </>
  )
}

export default App
