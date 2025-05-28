import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { PROJECTS } from '../../utils/constant/dummy';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  min-height: 100vh;
`;

// HEADER
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50px;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  opacity: 0.8;
  letter-spacing: 0.1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
  }
`;

const HomeButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    background-color: rgba(255,255,255,0.1);
  }
  
  &::before {
    content: '⌂';
    font-size: 16px;
  }
`;

// MAIN LAYOUT GRID
const DetailGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: calc(100vh - 60px);
  padding-top: 60px; // For fixed header
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: 40vh auto; // Image row, content row
    padding-top: 50px; // For fixed header (mobile)
    height: auto; // Allow content to dictate height
  }
`;

// LEFT COLUMN (IMAGE CAROUSEL)
const ImageColumn = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const MainImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProjectNumber = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
  font-size: 100px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 0.8;
  mix-blend-mode: difference;
  user-select: none;
  z-index: ${({ theme }) => theme.zIndex.overlay};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 60px;
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
  }
`;

const ImageControls = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: ${({ theme }) => theme.zIndex.overlay};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
  }
`;

const ThumbnailButton = styled.button`
  flex: 1;
  height: 80px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${({ $active }) => $active ? 1 : 0.7};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 60px;
  }
`;

// RIGHT COLUMN (CONTENT)
const ContentColumn = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
    height: auto; // Allow content to dictate height
  }
`;

const ProjectInfoSection = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ProjectTitle = styled.h1`
  font-size: 48px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const CreatorName = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

// BRUTAL GRID-BASED BUTTONS & TAGS
const BrutalGrid = styled.div`
  display: grid;
  gap: 1px; // Creates the brutal border effect
  background-color: ${({ theme }) => theme.colors.border}; // Border color
  border: 1px solid ${({ theme }) => theme.colors.border}; // Outer border
`;

const BrutalGridItemStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  border: none;
  width: 100%;
  display: block;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TagsContainer = styled(BrutalGrid)`
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

const Tag = styled.div`
  ${BrutalGridItemStyles}
`;

const ActionsContainer = styled(BrutalGrid)`
  grid-template-columns: 1fr; // Stack buttons vertically
`;

const ActionButton = styled.a`
  ${BrutalGridItemStyles}
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md}; // Larger padding for action buttons
  font-size: ${({ theme }) => theme.typography.sizes.base};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
`;

// OTHER PROJECTS
const OtherProjectsSection = styled.section`
  margin-top: auto; // Pushes to bottom on desktop
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const OtherProjectsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const OtherProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const OtherProjectItem = styled.a`
  position: relative;
  aspect-ratio: 1 / 0.75; // Maintain aspect ratio
  overflow: hidden;
  display: block;
  text-decoration: none;

  &::before { // Image container
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scale(1.05);
  }
  
  &::after { // Gradient overlay
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 70%);
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 0.5;
  }

  /* Hide 3rd and 4th items on mobile using CSS */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:nth-child(n+3) {
      display: none;
    }
  }
`;

const OtherProjectInfo = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
  z-index: ${({ theme }) => theme.zIndex.base + 1};
`;

const OtherProjectName = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 2px 0;
`;

const OtherProjectCreator = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small};
  opacity: 0.7;
  margin: 0;
`;

const ProjectDetail = ({ project, projectNumber }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // New states for smooth image transition
  const [imageToDisplay, setImageToDisplay] = useState(project ? project.images[0] : null);
  const [mainImageOpacity, setMainImageOpacity] = useState(1);

  // Effect to initialize/update imageToDisplay when project changes or on initial load
  useEffect(() => {
    if (project) {
      // Initialize with the first image or current image if index somehow changed before project load
      setImageToDisplay(project.images[currentImageIndex]);
      setMainImageOpacity(1); // Ensure it's visible
    }
  }, [project]); // Effect runs when project data is available

  // Auto-advance currentImageIndex
  useEffect(() => {
    if (!project || project.images.length <= 1) return; // No auto-advance if no project or single image

    const interval = setInterval(() => {
      setCurrentImageIndex(prev =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Auto-advances every 5 seconds

    return () => clearInterval(interval);
  }, [project]); // Depends only on project to setup/teardown interval

  // Handle visual transition when currentImageIndex changes
  useEffect(() => {
    if (!project || !imageToDisplay) return; // Guard against running before project/initial image is set

    // If the target image is already displayed and fully visible, do nothing.
    // This prevents an unnecessary fade effect on initial load after project is set.
    if (project.images[currentImageIndex] === imageToDisplay && mainImageOpacity === 1) {
      return;
    }

    setMainImageOpacity(0); // Start fade out of the current image

    const transitionDuration = 800; // Milliseconds, should match CSS opacity transition duration
    
    const timer = setTimeout(() => {
      setImageToDisplay(project.images[currentImageIndex]); // Change the image source
      setMainImageOpacity(1); // Start fade in of the new image
    }, transitionDuration); // Wait for the fade-out to complete before changing source and fading in

    return () => clearTimeout(timer); // Cleanup timeout if component unmounts or index changes again quickly
  }, [currentImageIndex, project, imageToDisplay]); // Effect runs when currentImageIndex changes

  if (!project) {
    // TODO: Add a proper loading state component
    return <PageWrapper>Loading project...</PageWrapper>;
  }

  const handleBackClick = () => router.push('/');
  const handleOtherProjectClick = (projectId) => router.push(`/project/${projectId}`);

  const otherProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  return (
    <PageWrapper>
      <Header>
        <Logo>Convergence Design III | K-Arts</Logo>
        <HomeButton onClick={handleBackClick}>Home</HomeButton>
      </Header>

      <DetailGrid>
        <ImageColumn>
          <MainImage $image={imageToDisplay} style={{ opacity: mainImageOpacity }} />
          <ProjectNumber>{projectNumber}</ProjectNumber>
          <ImageControls>
            {project.images.map((image, index) => (
              <ThumbnailButton
                key={index}
                $image={image}
                $active={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </ImageControls>
        </ImageColumn>

        <ContentColumn>
          <ProjectInfoSection>
            <div>
              <ProjectTitle>{project.title}</ProjectTitle>
              <CreatorName>{project.name}</CreatorName>
            </div>
            
            <TagsContainer>
              {project.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
            
            <ActionsContainer>
              <ActionButton href={project.webLink} target="_blank" rel="noopener noreferrer">
                Visit Website
              </ActionButton>
              <ActionButton href={project.githubLink} target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </ActionButton>
            </ActionsContainer>
            
            <Description>{project.description}</Description>
          </ProjectInfoSection>

          <OtherProjectsSection>
            <OtherProjectsTitle>More Projects</OtherProjectsTitle>
            <OtherProjectsGrid>
              {otherProjects.map((op) => (
                <OtherProjectItem
                  key={op.id}
                  $image={op.images[0]}
                  href={`/project/${op.id}`}
                  onClick={(e) => { e.preventDefault(); handleOtherProjectClick(op.id); }}
                  aria-label={`View project ${op.title} by ${op.name}`}
                >
                  <OtherProjectInfo>
                    <OtherProjectName>{op.title}</OtherProjectName>
                    <OtherProjectCreator>{op.name}</OtherProjectCreator>
                  </OtherProjectInfo>
                </OtherProjectItem>
              ))}
            </OtherProjectsGrid>
          </OtherProjectsSection>
        </ContentColumn>
      </DetailGrid>
    </PageWrapper>
  );
};

export default ProjectDetail; 