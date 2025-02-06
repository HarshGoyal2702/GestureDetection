import './App.css'

// install dependencies 
// import dependencies
// setup webcam and canvas
// define references to those 
// load handpose
// detect function
// drawing utilities from tensorflow
// draw function

import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { drawHand } from "./utilities"

import React, { useRef, useState } from 'react'

import * as fp from "fingerpose"

import { oneGesture, twoGesture, threeGesture, fourGesture, fiveGesture } from "./gestures";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [gestureName, setGestureName] = useState("");

  const runHandpose = async () => {
    const net = await handpose.load()
    console.log('Handpose model loaded.');

    // Loop and Detect hands

    setInterval(() => {
      detect(net);
    }, 100);

  }
  const detect = async (net) => {
    // Check data is available 
    // Get video properties
    // set video height and width
    // set canvas height and width
    // make detections
    // draw mesh


    // if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
    //   const video = webcamRef.current.video;
    //   const videoWidth = webcamRef.current.video.videoWidth;
    //   const videoHeight = webcamRef.current.video.videoHeight;


    //   webcamRef.current.video.width = videoWidth;
    //   webcamRef.current.video.height = videoHeight;


    //   canvasRef.current.width = videoWidth;
    //   canvasRef.current.height = videoHeight;


    //   const hand = await net.estimateHands(video);
    //   console.log(hand);



    //   if (hand.length > 0) {
    //     const GE = new fp.GestureEstimator([
    //       fp.Gestures.VictoryGesture,
    //       fp.Gestures.ThumbsUpGesture
    //     ])

    //     const gesture = await GE.estimate(hand[0].landmarks, 8);
    //     console.log(gesture);
    //   }

    //   const ctx = canvasRef.current.getContext("2d");
    //   drawHand(hand, ctx);

    // }

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

        if (gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => (p.confidence > c.confidence ? p : c));
          console.log("Detected Gesture:", maxConfidenceGesture.name);
          setGestureName(maxConfidenceGesture.name);
        }
        //   if (gesture.gestures.length > 0) {
        //     const maxConfidenceGesture = gesture.gestures.reduce((p, c) => (p.confidence > c.confidence ? p : c));
        //     setGestureName(maxConfidenceGesture.name);
        // }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }
  runHandpose();


  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} style={{
          position: "absolute",
          // margin:"auto",
          //   marginTop:0,
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          // margin:"auto",
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480
        }} />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            // margin:"auto",
            // marginTop:0,
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480
          }}
        />

        <h1 style={{
          position: "absolute",
          // margin:"auto",
          // marginTop:0,
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480
        }} >Detected Gesture: {gestureName}</h1>
      </header>
    </div>
  )
}

export default App
