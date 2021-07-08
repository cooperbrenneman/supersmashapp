import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.alertSuccessRef = React.createRef();
        this.alertFailRef = React.createRef();

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();

        this.alertSuccessRef.current.hidden = true;
        this.alertFailRef.current.hidden = true;

        const newUser = {
            username: this.state.username,
        };

        console.log(newUser);

        axios.post(process.env.REACT_APP_API + 'users', newUser, {
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                }
            })
            .then((res) => {
                console.log(res.data);
                this.alertSuccessRef.current.hidden = false;
            })
            .catch((res) => {
                console.log(res.data);
                this.alertFailRef.current.hidden = false;
            });
    }

    render() {
        return (
            <div className="container" >
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
                <br></br>
                <div id="SuccessAlert" hidden={true} ref={this.alertSuccessRef}>
                    <div className="alert alert-success" role="alert">
                        The user was successfully created!
                    </div>
                </div>
                <div id="FailureAlert" hidden={true} ref={this.alertFailRef}>
                    <div className="alert alert-danger" role="alert">
                        There was an error creating the user.
                    </div>
                </div>
            </div>
        )
    }
}