import { Component } from 'react';
import Cookie from 'next-cookies'
import Layout from '../components/layout';
import { login } from '../utils/auth';

class Login extends Component {
    static async getInitialProps(ctx) {
        const { token } = Cookie(ctx);
        return { token };
    }

    constructor(props) {
        super(props);
        this.state = { username: '', error: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const username = this.state.username;
        login({ username })
            .catch(error => {
                this.setState({ error: 'Login failed.' });
            });
    }

    render(props) {
        return (
            <Layout>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">GitHub username:</label>
                    <input
                        type="text"
                        id="username" 
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />

                    <hr/>
                    <button type="submit">Login</button>

                    <p>{this.state.error}</p>
                </form>
            </Layout>
        )
    }
}


export default Login
