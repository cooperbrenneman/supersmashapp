import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Match = props => (
    <tr>
        <td>{props.match.user.username}</td>
        <td>{props.match.battleType}</td>
        <td>{props.match.matchType}</td>
        <td>{props.match.stockNumber}</td>
        <td>{props.match.time}</td>
        <td>{props.match.playerFighter.name}</td>
        <td>{props.match.opponentFighter.name}</td>
        <td>{props.match.opponentLevel}</td>
        <td>{props.match.stage.name}</td>
        <td>{props.match.matchDate.substring(0, 10)}</td>
        <td>{props.match.matchLengthInSeconds}</td>
        <td>{props.match.result}</td>
        <td>{props.match.playerKOs}</td>
        <td>{props.match.opponentKOs}</td>
        <td>
            <Link className="btn btn-primary" to={"/edit/" + props.match._id}>Edit</Link>
        </td>
        <td>
            <div className="btn btn-danger" onClick={() => { props.deleteMatch(props.match._id) }}>Delete</div>
        </td>
    </tr>
)

export default class MatchList extends Component {
    constructor(props) {
        super(props);

        this.deleteMatch = this.deleteMatch.bind(this);

        this.state = { matches: [] };
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API + 'matches/')
            .then(response => {
                this.setState({ matches: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteMatch(id) {
        axios.delete(process.env.REACT_APP_API + 'matches/' + id)
            .then(res => console.log(res.data));
        this.setState({
            matches: this.state.matches.filter(el => el._id !== id)
        })
    }

    matchList() {
        return this.state.matches.map(currentMatch => {
            return <Match match={currentMatch} deleteMatch={this.deleteMatch} key={currentMatch._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Super Smash Ultimate Tracker App</h1>
                    <p className="lead">This is a basic Super Smash Ultimate tracker app that tracks matches.</p>
                    <hr className="my-4"></hr>
                    <p>This application allows you to add users (get and update), and manage matches (create, get, edit, delete).</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/user" role="button">Create a User</a><span>  </span>
                        <a className="btn btn-secondary btn-lg" href="/create" role="button">Create a Match</a>
                    </p>
                </div>
                <br></br>
                <h3>Matches</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User</th>
                            <th>Battle Type</th>
                            <th>Match Type</th>
                            <th>Stock #</th>
                            <th>Time</th>
                            <th>Player</th>
                            <th>Opponent</th>
                            <th>Level</th>
                            <th>Stage</th>
                            <th>Date</th>
                            <th>Length</th>
                            <th>Result</th>
                            <th>Player KOs</th>
                            <th>Opponent KOs</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.matchList()}
                    </tbody>
                </table>
            </div>
        )
    }
}