import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // include initial state values here
        };

        // bind functions here
        // ie. this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div>
                <Container className="container">

                    <Row>
                        <Col><h2>Pomodoro Clock</h2></Col>
                    </Row>

                    <Row>
                        <Col xs={6}><h3>Break Length</h3></Col>
                        <Col xs={6}><h3>Session Length</h3></Col>
                    </Row>

                    <div>
                        <Row>
                            <Col><p>Clock Header</p></Col>
                        </Row>

                        <Row>
                            <Col><h1>Clock Time</h1></Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xs={4}>
                            <Button className="btn">Start</Button>
                        </Col>
                        <Col xs={4}>
                            <Button className="btn">Stop</Button>
                        </Col>
                        <Col xs={4}>
                            <Button className="btn">Reset</Button>
                        </Col>
                    </Row>


                </Container>
            </div>
        );
    }
};

export default Pomodoro
