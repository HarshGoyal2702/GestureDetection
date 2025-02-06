import * as fp from "fingerpose";

// Number 1 Gesture
const oneGesture = new fp.GestureDescription("one");

// Index Finger: Extended
oneGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
oneGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

// Other Fingers: Curled
[fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb].forEach(finger => {
    oneGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// Number 2 Gesture
const twoGesture = new fp.GestureDescription("two");

// Index and Middle Finger: Extended
[twoGesture, oneGesture].forEach(gesture => {
    gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
});

// Other Fingers: Curled
[fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb].forEach(finger => {
    twoGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// Number 3 Gesture
const threeGesture = new fp.GestureDescription("three");

// Index, Middle, and Ring Finger: Extended
threeGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
threeGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
threeGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
threeGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
threeGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
threeGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);

// Other Fingers: Curled
[fp.Finger.Pinky, fp.Finger.Thumb].forEach(finger => {
    threeGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
});

// Number 4 Gesture
const fourGesture = new fp.GestureDescription("four");

// Index, Middle, Ring, and Pinky Finger: Extended
[fourGesture, threeGesture].forEach(gesture => {
    gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
    gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
    gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
    gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);
    gesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);
});

// Thumb: Curled
fourGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);

// Number 5 Gesture
const fiveGesture = new fp.GestureDescription("five");

// All Fingers Extended
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb].forEach(finger => {
    fiveGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    fiveGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
});

export { oneGesture, twoGesture, threeGesture, fourGesture, fiveGesture };
