import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../common/Header';
import { PROJECTS } from '../../utils/constant/dummy';

const DetailContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary}; /* Black background */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const LeftColumn = styled.div`
  position: relative;
  width: 50vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100vw;
    height: 60vh;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const RightColumn = styled.div`
  width: 50vw;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.primary}; /* Black background */
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100vw;
    height: auto;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const MainImage = styled.div`
  width: 100%;
  height: calc(100% - 120px);
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.8s ease-in-out; /* Smooth transition */
`;

const ProjectNumberDetail = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
`;

const Carousel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
  overflow-x: auto;
`;

const ThumbnailImage = styled.div`
  min-width: 80px;
  height: 80px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.05);
  }
`;

const CarouselProgress = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'rgba(255,255,255,0.3)'};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const BackButton = styled.button`
  align-self: flex-end;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  border: 1px solid rgba(255,255,255,0.2);
  
  &:hover {
    opacity: 0.7;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProjectTitleDetail = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }
`;

const CreatorNameDetail = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Tag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: rgba(255,255,255,0.1);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  border: 1px solid rgba(255,255,255,0.2);
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: rgba(255,255,255,0.2);
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const VisitButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.fast};
  width: fit-content;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProjectDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.9;
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const GitHubLink = styled.a`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.5);
  transition: all ${({ theme }) => theme.transitions.fast};
  width: fit-content;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  &:hover {
    opacity: 0.7;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const OtherProjectsSection = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const OtherProjectsTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.9;
`;

const OtherProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OtherProjectItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: ${({ theme }) => theme.colors.secondary};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.3);
  }
`;

const OtherProjectThumb = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const OtherProjectInfo = styled.div`
  flex: 1;
`;

const OtherProjectTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  margin-bottom: 2px;
`;

const OtherProjectCreator = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  opacity: 0.7;
`;

const ProjectDetail = ({ project, projectNumber }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [project.images.length]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleOtherProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  // Get other projects (excluding current)
  const otherProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  return (
    <>
      <Header />
      <DetailContainer>
        <LeftColumn>
          <MainImage $image={project.images[currentImageIndex]} />
          <ProjectNumberDetail>{projectNumber}</ProjectNumberDetail>
          
          <Carousel>
            {project.images.map((image, index) => (
              <ThumbnailImage
                key={index}
                $image={image}
                $active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
            <CarouselProgress>
              {project.images.map((_, index) => (
                <ProgressDot
                  key={index}
                  $active={index === currentImageIndex}
                />
              ))}
            </CarouselProgress>
          </Carousel>
        </LeftColumn>
        
        <RightColumn>
          <BackButton onClick={handleBackClick}>
            ← Back to home
          </BackButton>
          
          <ProjectTitleDetail>{project.title}</ProjectTitleDetail>
          <CreatorNameDetail>{project.name}</CreatorNameDetail>
          
          <TagsContainer>
            {project.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
          
          <VisitButton href={project.webLink} target="_blank" rel="noopener noreferrer">
            Visit Website
          </VisitButton>
          
          <ProjectDescription>
            <p>{project.description}</p>
          </ProjectDescription>
          
          {project.githubLink && (
            <GitHubLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </GitHubLink>
          )}

          <OtherProjectsSection>
            <OtherProjectsTitle>View Other Projects</OtherProjectsTitle>
            <OtherProjectsList>
              {otherProjects.map((otherProject, index) => (
                <OtherProjectItem
                  key={otherProject.id}
                  onClick={() => handleOtherProjectClick(otherProject.id)}
                >
                  <OtherProjectThumb $image={otherProject.images[0]} />
                  <OtherProjectInfo>
                    <OtherProjectTitle>{otherProject.title}</OtherProjectTitle>
                    <OtherProjectCreator>{otherProject.name}</OtherProjectCreator>
                  </OtherProjectInfo>
                </OtherProjectItem>
              ))}
            </OtherProjectsList>
          </OtherProjectsSection>
        </RightColumn>
      </DetailContainer>
    </>
  );
};

export default ProjectDetail; 