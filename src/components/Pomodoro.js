import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        this.setState(state=>({
            minutesLeft: this.state.sessionLength,
            secondsLeft: "00",
            clockType: "Session",
            countdown: false
        }))
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;
    }

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

    changeTimer() {
        
        var clockType = this.state.clockType;

        if (clockType === "Session") {
            this.setState(state=>({
                minutesLeft: this.state.breakLength,
                secondsLeft: "00",
                clockType: "Break",
                countdown: false
            })) 
        }

        else if (clockType === "Break") {
            this.setState(state=>({
                minutesLeft: this.state.sessionLength,
                secondsLeft: "00",
                clockType: "Session",
                countdown: false
            })) 
        }

        this.controlTimer("Start");
    }

    increment(status) {
        if (status === "Session" && this.state.clockActive === false) {

            const shouldUpdate = this.updateTime(this.state.sessionLength, "increment");
            const updatedMinutes = this.state.sessionLength + 1;

            if (shouldUpdate) {
                this.setState(state=>({
                    sessionLength: updatedMinutes,
                    minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                })) 
            }
            
        } else if (status === "Break" && this.state.clockActive === false) {

            const shouldUpdate = this.updateTime(this.state.breakLength, "increment");
            const updatedMinutes = this.state.sessionLength + 1;

            if (shouldUpdate) {
                this.setState(state=>({
                    breakLength: this.state.breakLength + 1,
                    minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                }))
            }
        }
    }

    decrement(status) {

        if (status === "Session" && this.state.clockActive === false) {

            const shouldUpdate = this.updateTime(this.state.sessionLength, "decrement");
            const updatedMinutes = this.state.sessionLength - 1;

            if (shouldUpdate) {
                this.setState(state=>({
                    sessionLength: updatedMinutes,
                    minutesLeft: updatedMinutes,
                    secondsLeft: "00"
                }))
            }

        } else if (status === "Break" && this.state.clockActive === false) {

            const shouldUpdate = this.updateTime(this.state.breakLength, "decrement");

            if (shouldUpdate) {
                this.setState(state=>({
                    breakLength: this.state.breakLength - 1
                }))
            }
        }
    }

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
            color: 'black'
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
                        <Col xs={6}>
                            <h3>Break Length</h3>
                            <Button onClick={()=>this.increment("Break")}>+</Button>
                            <p>{this.state.breakLength}</p>
                            <Button onClick={()=>this.decrement("Break")}>-</Button>
                        </Col>

                        <Col xs={6}>
                            <h3>Session Length</h3>
                            <Button onClick={()=>this.increment("Session")}>+</Button>
                            <p>{this.state.sessionLength}</p>
                            <Button onClick={()=>this.decrement("Session")}>-</Button>
                        </Col>
                    </Row>

                    <div>
                        <Row>
                            <Col><p style={textStyle}>{this.state.clockType}</p></Col>
                        </Row>

                        <Row>
                            <Col><h1 style={textStyle}>{this.state.minutesLeft}:{this.state.secondsLeft}</h1></Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xs={4}>
                            <Button onClick={()=>this.controlTimer("Start")}>Start</Button>
                        </Col>
                        <Col xs={4}>
                            <Button onClick={()=>this.controlTimer("Stop")}>Stop</Button>
                        </Col>
                        <Col xs={4}>
                            <Button onClick={this.reset}>Reset</Button>
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
