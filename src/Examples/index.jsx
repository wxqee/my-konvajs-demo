import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import ExampleOne from "./components/ExampleOne";

import './style.scss'

const examples = [
  {
    label: 'Example 1',
    name: 'one',
    component: ExampleOne,
  }
];

const Examples = () => {
  let { path, url } = useRouteMatch();

  return (
    <div className='examples'>
      <nav>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>
              <Link to={`${url}/${example.name}`}>{example.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={'playground'}>
        <Switch>
          {examples.map((example, index) => (
            <Route key={index} exact path={`${path}/one`} component={ExampleOne} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default Examples;
