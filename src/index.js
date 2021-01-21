import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import ErrorBoundry from './components/error-boundry';
/* Import services modules */
import ProjectsService from './services/projects-service';
import { ProjectsServiceProvider } from './components/projects-service-context';

import store from './store';

const projectsService = new ProjectsService();

ReactDOM.render(
  <Provider store={store} >
    <ErrorBoundry>
      <ProjectsServiceProvider value={projectsService} >
        <App />
      </ProjectsServiceProvider >
    </ErrorBoundry>
  </Provider >,
  document.getElementById('root')
);
