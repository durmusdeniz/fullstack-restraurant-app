import {Jumbotron, Row, Badge, Button} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import React from "react";
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import RestaurantCard from "./restaurantcard";
import UserList from "./userlist";
const axios = require("axios");
const cachedData = require("./cache.js")


class App extends React.Component{

    NewListRef = React.createRef();
    PickedListRef = React.createRef();


    constructor(props) {
        super();
        this.state = {
                        selectedDate: new Date(),
                        total:0,
                        page: 0,
                        loginId:'',
                        lists:[]
        }

    }



    OpenDateSelection = (startDay) =>{
        this.setState({
            selectedDate : startDay,
            total:this.state.total,
            page: this.state.page,
            loginId: this.state.loginId,
            lists:this.state.lists
        });
    }

    PageDown = () =>{
        this.setState({
            selectedDate : this.state.selectedDate,
            total:this.state.total,
            page: this.state.page - 1,
            loginId: this.state.loginId,
            lists:this.state.lists
        });
    }

    PageUp = () =>{
        this.setState({
            selectedDate : this.state.selectedDate,
            total:this.state.total,
            page: this.state.page + 1,
            loginId: this.state.loginId,
            lists: this.state.lists
        });
    }
    LoginSuccess = (loginResponse) => {
        console.log("Login success!")
        let self = this;
        axios.get(`${process.env.REACT_APP_GLINTS_GETLISTS_URL}?id=${loginResponse.googleId}`)
            .then(function (response) {
            self.setState({
                    selectedDate : self.state.selectedDate,
                    total:self.state.total,
                    page: self.state.page,
                    loginId:loginResponse.googleId,
                    lists : response.data.map((liste, index) => liste.listname)
                });
            console.log(`Login Success call updates the lists to ${JSON.stringify(response.data.map((liste, index) => liste.listname))}` )
            }).catch(function (error) {
            console.log(error);
        }).then(function () {});
    }

    LoginFail = (loginResponse) => {
        alert("Failed to login.");
    }

    LogoutSuccess = (logoutResponse) => {

        this.setState({
            selectedDate : this.state.selectedDate,
            total:this.state.total,
            page: this.state.page,
            loginId:'',
            lists:[]
        });

    }


    ListOpenRestaurants = () =>{

        let dayIndex = this.state.selectedDate.getDay() === 0 ? 7 : this.state.selectedDate.getDay();
        let timeValue = this.state.selectedDate.getHours() + ":" + this.state.selectedDate.getMinutes();

        var self = this;
        axios.get(`${process.env.REACT_APP_GLINTS_SEARCH_URL}?day=${dayIndex}&open=${timeValue}`)
            .then(function (response) {
                cachedData.CachedData = response.data;
                if(cachedData.CachedData.length <=20){
                    self.setState({
                        selectedDate : self.state.selectedDate,
                        total: cachedData.CachedData.length,
                        lists:self.state.lists,
                        loginId:self.state.loginId,
                        page:0
                    });
                }else{
                    self.setState({
                        selectedDate : self.state.selectedDate,
                        total: cachedData.CachedData.length,
                        lists:self.state.lists,
                        loginId:self.state.loginId,
                        page:0
                    });
                }
            }).catch(function (error) {
                console.log(error);
        }).then(function () {});

    }


    GetList = () =>{

        axios.get(`${process.env.REACT_APP_GLINTS_GETLISTS_URL}?id=${this.state.loginId}`)
            .then(function (response) {
                alert(JSON.stringify(response.data))
            }).catch(function (error) {
            console.log(error);
        }).then(function () {});
    }




    render(){
        return (
            <Jumbotron>
                {this.state.loginId === '' ?
                    <Row className="justify-content-center">
                        <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText="Sign In with Google Account"
                                     onSuccess={this.LoginSuccess} onFailure={this.LoginFail} isSignedIn={true}
                        />
                    </Row>:
                    <Row className="justify-content-center">
                        <GoogleLogout clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} buttonText="Sign Out" onLogoutSuccess={this.LogoutSuccess} />
                    </Row>
                }
                <Row className="justify-content-center">
                    <Badge pill variant="success">Please select opening time for listing restaurants</Badge>
                </Row>
                <Row className="justify-content-center">
                    <DateTimePicker format="y/MM/dd HH:mm" onChange={this.OpenDateSelection} value={this.state.selectedDate} minDate={new Date()} maxDetail="minute" disableClock={false}/>
                </Row>
                <Row className="justify-content-center">
                    <Button onClick={this.ListOpenRestaurants}  variant="outline-danger">List Open Restaurants</Button>
                </Row>
                {this.state.loginId !== ''? <Row className="justify-content-center">
                    <UserList login={this.state.loginId} lists={this.state.lists} />
                </Row>:''}
                <Row className="justify-content-center">
                    {cachedData.CachedData.slice(this.state.page*20, (this.state.page+1)*20).map((restaurant, index) => (
                        <RestaurantCard login={this.state.loginId} key={index} name={restaurant.name} lists={this.state.lists}/>
                    ))}
                </Row>
                {cachedData.CachedData.slice(this.state.page*20, (this.state.page+1)*20).length === 0 ? '':<Row className="justify-content-center">
                    <Button disabled={this.state.page === 0} onClick={this.PageDown} variant={this.state.page === 0 ? "light":"primary"}>&#60;&#60;&#60;&#60;</Button>
                    {`Showing ${this.state.page*20} - ${(this.state.page+1)*20 >= this.state.total ? this.state.total:(this.state.page+1)*20} of ${this.state.total} Restaurants.`}
                    <Button disabled={(this.state.page+1)*20 >= this.state.total} onClick={this.PageUp} variant={(this.state.page+1)*20 >= this.state.total ? "light":"primary"}>&#62;&#62;&#62;&#62;</Button>
                </Row>}

            </Jumbotron>
        );
    }

}

export default App;
