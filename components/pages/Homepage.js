import { useRouter } from 'next/router';
import { PROJECTS } from '../../utils/constant/dummy';
import Header from '../common/Header';
import {
  GridContainer,
  GridItem,
  ProjectImage,
  ProjectNumber,
  HoverOverlay,
  ProjectTitle,
  CreatorName
} from '../common/Grid';

const Homepage = () => {
  const router = useRouter();

  const handleProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  return (
    <>
      <Header />
      <GridContainer>
        {PROJECTS.map((project, index) => (
          <GridItem
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProjectClick(project.id);
              }
            }}
            aria-label={`View project ${project.title} by ${project.name}`}
          >
            <ProjectImage $image={project.images[0]} />
            
            <ProjectNumber>
              {index + 1}
            </ProjectNumber>
            
            <HoverOverlay>
              <ProjectTitle>{project.title}</ProjectTitle>
              <CreatorName>{project.name}</CreatorName>
            </HoverOverlay>
          </GridItem>
        ))}
      </GridContainer>
    </>
  );
};

export default Homepage; 