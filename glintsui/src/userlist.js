import {Row, Button, Modal, DropdownButton, Dropdown} from "react-bootstrap";
import React from "react";
const axios = require("axios");

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show : false, list: []};
    }

    HandleShow = () =>{
        var self = this;
        axios.get(`${process.env.REACT_APP_GLINTS_GETLISTS_URL}?id=${this.props.login}`)
            .then(function (response) {
                self.setState({show:true, list: response.data});
            }).catch(function (error) {
            console.log(error);
        }).then(function () {});
    }

    HandleClose = () =>{
        this.setState({show:false, list: this.state.list});
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.HandleShow}>
                    Check Your list
                </Button>

                <Modal show={this.state.show} onHide={this.HandleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Saved Lists</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.list.map((liste, index) =>(
                            <Row  key={index} className="justify-content-center">
                            <DropdownButton key={index} variant={index %2 === 0 ? 'info':'warning'} title={liste.listname}>
                                {liste.content.split(",").map((restaurant, i) =>(
                                    <Dropdown.Item key={i} href="#">{restaurant}</Dropdown.Item>
                                ))}
                            </DropdownButton>
                            </Row>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.HandleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default UserList;