import React from 'react';
import { ProjectsServiceConsumer } from '../projects-service-context'

const withProjectService = () => (Wrapped) => {
  return (props) => {
    return (
      <ProjectsServiceConsumer>
        {
          ( projectsService ) => {
            return ( <Wrapped {...props} projectsService={projectsService} /> )
          }
        }
      </ProjectsServiceConsumer>
    )
  }
};

export default withProjectService;
