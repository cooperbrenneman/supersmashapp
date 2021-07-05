import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateMatch extends Component {

    constructor(props) {
        super(props);

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeStockNumber = this.onChangeStockNumber.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangePlayerFighter = this.onChangePlayerFighter.bind(this);
        this.onChangeOpponentFighter = this.onChangeOpponentFighter.bind(this);
        this.onChangeOpponentLevel = this.onChangeOpponentLevel.bind(this);
        this.onChangeStage = this.onChangeStage.bind(this);
        this.onChangeMatchDate = this.onChangeMatchDate.bind(this);
        this.onChangeResult = this.onChangeResult.bind(this);
        this.onChangeMatchLengthInSeconds = this.onChangeMatchLengthInSeconds.bind(this);
        this.onChangePlayerKOs = this.onChangePlayerKOs.bind(this);
        this.onChangeOpponentKOs = this.onChangeOpponentKOs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: null,
            battleType: "Solo",
            matchType: "Stock",
            stockNumber: 5,
            time: "INF",
            playerFighter: null,
            opponentFighter: null,
            opponentLevel: 9,
            stage: null,
            matchDate: new Date(),
            matchLengthInSeconds: 0,
            result: "Win",
            playerKOs: 0,
            opponentKOs: 0,
            users: [],
            stages: [],
            fighters: [],
            results: ['Win', 'Loss']
        }
    }

    componentDidMount() {
        axios.get('http://' + process.env.REACT_APP_APIHOST + ':' + process.env.REACT_APP_APIPORT + '/api/v1/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data,
                        user: response.data[0]
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://' + process.env.REACT_APP_APIHOST + ':' + process.env.REACT_APP_APIPORT + '/api/v1/stages/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        stages: response.data,
                        stage: response.data[0]
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://' + process.env.REACT_APP_APIHOST + ':' + process.env.REACT_APP_APIPORT + '/api/v1/fighters/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        fighters: response.data,
                        playerFighter: response.data[0],
                        opponentFighter: response.data[0]
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value
        });
    }
    onChangeStockNumber(e) {
        this.setState({
            stockNumber: e.target.value
        });
    }
    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }
    onChangePlayerFighter(e) {
        this.setState({
            playerFighter: e.target.value
        });
    }
    onChangeOpponentFighter(e) {
        this.setState({
            opponentFighter: e.target.value
        });
    }
    onChangeOpponentLevel(e) {
        this.setState({
            opponentLevel: e.target.value
        });
    }
    onChangeStage(e) {
        this.setState({
            stage: e.target.value
        });
    }
    onChangeMatchDate(date) {
        this.setState({
            matchDate: date
        });
    }
    onChangeMatchLengthInSeconds(e) {
        this.setState({
            matchLengthInSeconds: e.target.value
        });
    }
    onChangeResult(e) {
        this.setState({
            result: e.target.value
        });
    }
    onChangePlayerKOs(e) {
        this.setState({
            playerKOs: e.target.value
        });
    }
    onChangeOpponentKOs(e) {
        this.setState({
            opponentKOs: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const match = {
            user: this.state.user,
            battleType: this.state.battleType,
            matchType: this.state.matchType,
            stockNumber: this.state.stockNumber,
            time: this.state.time,
            playerFighter: this.state.playerFighter,
            opponentFighter: this.state.opponentFighter,
            opponentLevel: this.state.opponentLevel,
            stage: this.state.stage,
            matchDate: this.state.matchDate,
            matchLengthInSeconds: this.state.matchLengthInSeconds,
            result: this.state.result,
            playerKOs: this.state.playerKOs,
            opponentKOs: this.state.opponentKOs,
        };
        console.log(match);

        axios.post('http://' + process.env.REACT_APP_APIHOST + ':' + process.env.REACT_APP_APIPORT + '/api/v1/matches', match)
            .then(res => console.log(res.data));
        // window.location = '/';
    }

    render() {
        return (
            <div className="container">
                <h3>Create New Match</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.user}
                            onChange={this.onChangeUser}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user.username}
                                        value={user._id}>{user.username}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Stock Number: </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.stockNumber}
                            onChange={this.onChangeStockNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.time}
                            onChange={this.onChangeTime}
                        />
                    </div>
                    <div className="form-group">
                        <label>Player Fighter: </label>
                        <select ref="playerFighterInput"
                            required
                            className="form-control"
                            value={this.state.playerFighter}
                            onChange={this.onChangePlayerFighter}>
                            {
                                this.state.fighters.map(function (fighter) {
                                    return <option
                                        key={fighter.name}
                                        value={fighter._id}>{fighter.name}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Opponent Fighter: </label>
                        <select ref="opponentFighterInput"
                            required
                            className="form-control"
                            value={this.state.opponentFighter}
                            onChange={this.onChangeOpponentFighter}>
                            {
                                this.state.fighters.map(function (fighter) {
                                    return <option
                                        key={fighter.name}
                                        value={fighter._id}>{fighter.name}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Stage: </label>
                        <select ref="stageInput"
                            required
                            className="form-control"
                            value={this.state.stage}
                            onChange={this.onChangeStage}>
                            {
                                this.state.stages.map(function (stage) {
                                    return <option
                                        key={stage.name}
                                        value={stage._id}>{stage.name}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Match Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.matchDate}
                                onChange={this.onChangeMatchDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Match Length In Seconds: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.matchLengthInSeconds}
                            onChange={this.onChangeMatchLengthInSeconds}
                        />
                    </div>
                    <div className="form-group">
                        <label>Result: </label>
                        <select ref="resultInput"
                            required
                            className="form-control"
                            value={this.state.result}
                            onChange={this.onChangeResult}>
                            {
                                this.state.results.map(function (result) {
                                    return <option
                                        key={result}
                                        value={result}>{result}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Player KOs: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.playerKOs}
                            onChange={this.onChangePlayerKOs}
                        />
                    </div>
                    <div className="form-group">
                        <label>Opponent KOs: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.opponentKOs}
                            onChange={this.onChangeOpponentKOs}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create Match" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}