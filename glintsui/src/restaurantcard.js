import { Row, Button, Card, Form} from "react-bootstrap";
import React from "react";
const axios = require("axios");

class RestaurantCard extends React.Component{


    NewListRef = React.createRef();

    AddToList = (list) =>{
        let liste = list === undefined ? this.NewListRef.current.value : list;
        if(liste !== ''){
            axios.get(`${process.env.REACT_APP_GLINTS_ADDTOLIST_URL}?id=${this.props.login}&restaurant=${this.props.name}&list=${liste}`)
                .then(function (response) {
                    alert(`Added to ${liste}!`);
                }).catch(function (error) {
                console.log(error);
            }).then(function () {});
        }else{
            alert(`Please select or enter a list name`);
        }

    }

    HandleSelection = (e) =>{
        this.AddToList(e.target.value);
    }

    render() {
        return(
            <Card style={{width:'25%'}}>
                <Card.Body>
                    <Row className="justify-content-center">
                        {this.props.name}
                    </Row>
                    <Row className="justify-content-center">
                        <label htmlFor="lists">Please pick a list or enter a new one</label>
                        <Form.Control disabled={this.props.login === ''} onChange={this.HandleSelection} id="lists" as="select">
                            <option disabled={true} selected={true}>Please pick a list</option>
                            {
                                this.props.lists.map((liste, index)=>(
                                    <option key={index} value={liste}>{liste}</option>
                                ))
                            }
                        </Form.Control>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="input-group">
                            <input disabled={this.props.login === ''} type="text" ref={this.NewListRef} className="form-control" placeholder={"Type a new list name to add the restaurant"} />
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <Button disabled={this.props.login === ''} onClick={() => this.AddToList(undefined)}variant="primary">Add to List</Button>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default RestaurantCard;