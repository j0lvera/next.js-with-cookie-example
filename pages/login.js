import { Component } from 'react';
import Layout from '../components/layout';
import { login } from '../utils/auth';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { username: '', error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ username: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const username = this.state.username
    login({ username })
      .catch(() =>
        this.setState({ error: 'Login failed.' }))
  }

  render() {
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

          <button type="submit">Login</button>

          <p className="error">
            {this.state.error && `Error: ${this.state.error}`}
          </p>
        </form>
        <style jsx>{`
          .error {
            color: brown;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Login
