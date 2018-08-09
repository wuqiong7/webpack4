import {Component} from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import Frame from './frame'
import Hello from './page-hello'
import TableDemo from './page-table-demo'

export default class Entry extends Component {
  render() {
    return (
      <Router>
        <Frame >
          <Switch>
            <Route path="/hello" component={Hello} />
            <Route path="/table-demo" component={TableDemo} />
            <Redirect exact from="/" to="/hello" />
            <Route render={() => <div className="FBV FBAC FBJC" style={{fontSize: 100}}>404</div>} />
          </Switch>
        </Frame >
      </Router>
    )
  }
}

ReactDOM.render(
  <Entry />,
  document.getElementById('root')
)
