import { Component } from "react";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    // componentDidMount() {
    //     fetch('/api')
    //         .then(res => {
    //             resClone = res.clone();
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(1)
    //             https://support.stripe.com/questions/how-to-fix-syntaxerror-unexpected-token-in-json-at-position-0
    //         }, (rejectionReason) => {
    //             console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
    //             responseClone.text() // 5
    //                 .then(function (bodyText) {
    //                     console.log('Received the following instead of valid JSON:', bodyText); // 6
    //                 });
    //         });
    // }

    // "options": {
    //     "allowedHosts": [
    //       "localhost",
    //       ".localhost"
    //     ],
    //     "proxy": "http://localhost:3001"
    //   },

    componentDidMount() {
        fetch('http://localhost:3001/api/')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    // componentDidMount() {
    //     fetch('/api/users')
    //         .then(res => res.json())
    //         .then(users => {
    //             this.setState({ users: users });
    //         });
    // }

    render() {
        return (
            <ul>
                {
                    this.state.users.map(user => (
                        <li>Username {user.username}, Age: {user.age}</li>
                    ))
                }
            </ul>
        )
    }
}

export default Users;