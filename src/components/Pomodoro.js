import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdPlayArrow} from 'react-icons/md';
import {MdPause} from 'react-icons/md';
import {MdRefresh} from 'react-icons/md';
import './Pomodoro.css';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clockType: "Session",
            breakLength: 5,
            sessionLength: 25,
            minutesLeft: "25",
            secondsLeft: "00",
            clockActive: false
        };

        // bind functions here
        this.reset = this.reset.bind(this);
        this.countdown = this.countdown.bind(this);
        this.controlTimer = this.controlTimer.bind(this);
    }

    // Resets clock to session length and updates status to Session
    reset() {

        var minutesLeft = this.state.sessionLength;
        if (minutesLeft < 10) {
            minutesLeft = "0" + minutesLeft
        }

        this.setState(state=>({
            minutesLeft: minutesLeft,
            secondsLeft: "00",
            clockType: "Session",
            countdown: false
        }))
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;
    }

    // Controls the countdown based on user input
    controlTimer(control) {

        if (control === "Start") {
            if (this.state.clockActive === false) {
                var intervalID = setInterval(this.countdown, 100);
                this.setState(state=>({
                    intervalID: intervalID,
                    clockActive: true
                })) 
            }
        } 
        
        if (control === "Stop") {
            intervalID = this.state.intervalID;
            clearInterval(intervalID);
            this.setState(state=>({
                clockActive: false
            }))
        }
    }

    // Initiates a countdown with the mins/secs left
    countdown() {

        var seconds = parseInt(this.state.secondsLeft);
        var minutes = parseInt(this.state.minutesLeft);

        if (seconds === 0 && minutes === 0) {
            this.controlTimer("Stop")
            this.changeTimer()
            this.alarmSound.play();
        } 
        
        else {
            if (seconds === 0) {
                seconds = 59;
                minutes--;
            } else {
                seconds--;
            }
    
            if (minutes < 10) {
                minutes = "0" + minutes.toString();
            } else {
                minutes = minutes.toString();
            }
    
            if (seconds < 10) {
                seconds = "0" + seconds.toString();
            } else {
                seconds = seconds.toString();
            }
    
            this.setState(state=>({
                minutesLeft: minutes,
                secondsLeft: seconds
            }))
        }
        
    }

    // Changes clockType and resets time
    changeTimer() {
        
        var clockType = this.state.clockType;

        if (clockType === "Session") {

            var minutesLeft = this.state.breakLength;
            if (minutesLeft < 10) {
                minutesLeft = "0" + minutesLeft
            }

            this.setState(state=>({
                minutesLeft: minutesLeft,
                secondsLeft: "00",
                clockType: "Break",
                countdown: false
            })) 
        }

        else if (clockType === "Break") {
            minutesLeft = this.state.sessionLength;
            if (minutesLeft < 10) {
                minutesLeft = "0" + minutesLeft
            }
            this.setState(state=>({
                minutesLeft: minutesLeft,
                secondsLeft: "00",
                clockType: "Session",
                countdown: false
            })) 
        }

        this.controlTimer("Start");
    }

    // Increments the sessionLength or breakLength
    increment(status) {
        if (status === "Session" && this.state.clockActive === false) {

            var shouldUpdate = this.updateTime(this.state.sessionLength, "increment");
            var updatedMinutes = this.state.sessionLength + 1;

            if (updatedMinutes < 10) {
                updatedMinutes = "0" + updatedMinutes
            }

            if (shouldUpdate) {
                this.setState(state=>({
                    sessionLength: parseInt(updatedMinutes),
                    minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                })) 
            }
            
        } else if (status === "Break" && this.state.clockActive === false) {

            shouldUpdate = this.updateTime(this.state.breakLength, "increment");
            updatedMinutes = this.state.breakLength + 1;

            if (updatedMinutes < 10) {
                updatedMinutes = "0" + updatedMinutes
            }

            if (shouldUpdate) {
                this.setState(state=>({
                    breakLength: parseInt(updatedMinutes),
                    //minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                }))
            }
        }
    }

    // Decrements the sessionLength or breakLength
    decrement(status) {

        if (status === "Session" && this.state.clockActive === false) {

            var shouldUpdate = this.updateTime(this.state.sessionLength, "decrement");
            var updatedMinutes = this.state.sessionLength - 1;

            if (updatedMinutes < 10) {
                updatedMinutes = "0" + updatedMinutes
            }

            if (shouldUpdate) {
                this.setState(state=>({
                    sessionLength: parseInt(updatedMinutes),
                    minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                }))
            }

        } else if (status === "Break" && this.state.clockActive === false) {

            const shouldUpdate = this.updateTime(this.state.breakLength, "decrement");

            if (shouldUpdate) {
                this.setState(state=>({
                    breakLength: parseInt(this.state.breakLength - 1)
                }))
            }
        }
    }

    // Determines whether or not to update the time based on constraints
    updateTime(length, action) {
        
        if (length === 1 && action === "decrement") {
            return false
        }

        if (length === 60 && action === "increment") {
            return false
        }

        return true

    }

    render() {
        
        // Set text to red when < 1 min remains on the clock
        let textStyle = {
            color: 'white'
        }

        if(this.state.minutesLeft === "00") {
            textStyle = {
                color: 'red'
            }
        }

        return (
            <div>
                <Container className="container">

                    <Row>
                        <Col><h2>Pomodoro Clock</h2></Col>
                    </Row>

                    <Row>
                        <Col xs={6} className="text-center">
                            <h3>Break Length</h3>
                            <button onClick={()=>this.increment("Break")}>+</button>
                            <p className="d-inline duration">{this.state.breakLength}</p>
                            <button onClick={()=>this.decrement("Break")}>-</button>
                        </Col>

                        <Col xs={6} className="text-center">
                            <h3>Session Length</h3>
                            <button onClick={()=>this.increment("Session")}>+</button>
                            <p className="d-inline duration">{this.state.sessionLength}</p>
                            <button onClick={()=>this.decrement("Session")}>-</button>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Row>
                            <Col><h1 style={textStyle}>{this.state.minutesLeft}:{this.state.secondsLeft}</h1></Col>
                        </Row>
                        
                        <Row>
                            <Col><p style={textStyle}>{this.state.clockType}</p></Col>
                        </Row>
                    </div>

                    <Row className="text-center">
                        <Col xs={4} className="text-right">
                            <button onClick={()=>this.controlTimer("Start")}><MdPlayArrow /></button>
                        </Col>
                        <Col xs={4}>
                            <button onClick={()=>this.controlTimer("Stop")}><MdPause /></button>
                        </Col>
                        <Col xs={4} className="text-left">
                            <button onClick={this.reset}><MdRefresh /></button>
                        </Col>
                    </Row>
                </Container>
                <audio
                    id="alarmSound"
                    preload="auto"
                    ref={(audio) => {
                        this.alarmSound = audio;
                    }}
                    src="http://soundbible.com/grab.php?id=2062&type=wav"
                />
            </div>
        );
    }
};

export default Pomodoro