import { useState, useEffect, useRef } from 'react';
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
    display: none; // Hide logo text on mobile for detail page
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
  background-color: ${({ theme }) => theme.colors.primary}; // Ensure background for transition
`;

const MainImage = styled.div`
  position: absolute; // Allow stacking
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity; // Hint for browser optimization
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
  margin-bottom: ${({ theme }) => theme.spacing.xl * 2.5}; // INCREASED general bottom margin

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl * 2}; // INCREASED tablet bottom margin
  }
`;

const ProjectTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem); // DESKTOP: Reduced max and preferred
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem; // Adjusted mobile size (28px)
  }
`;

const CreatorName = styled.p`
  font-size: clamp(0.8rem, 1.8vw, 0.9rem); // DESKTOP: Reduced max and preferred
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
  padding: ${({ theme }) => theme.spacing.lg}; // DESKTOP TAGS: Increased padding significantly
  font-size: clamp(0.7rem, 1.3vw, 0.8rem); // DESKTOP TAGS: Reduced font, adjusted preferred
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); // DESKTOP: Wider min for tags, forcing fewer columns
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); // MEDIUM: Adjusted min for wider tags
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none; // Hide brutal grid tags on mobile
  }
`;

const MobileTagsText = styled.p`
  display: none;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7;
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.md} 0;
  word-wrap: break-word;
  text-align: left; // Align to left, as per typical tag strings

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block; // Show only on mobile
  }
`;

const Tag = styled.div`
  ${BrutalGridItemStyles} 

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    font-size: clamp(0.7rem, 1.3vw, 0.8rem); // MEDIUM: Adjusted for wider tags
    padding: ${({ theme }) => theme.spacing.md}; // MEDIUM: Padding adjusted
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs || '0.75rem'}; // Mobile tags specifically
    padding: ${({ theme }) => theme.spacing.sm};
    text-align: center; // Ensure text is centered
  }
`;

const ActionsContainer = styled(BrutalGrid)`
  grid-template-columns: 1fr; // Stack buttons vertically
`;

const ActionButton = styled.a`
  ${BrutalGridItemStyles} 
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  font-size: clamp(0.8rem, 1.8vw, 0.9rem); // DESKTOP: Reduced action button font size

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs || '0.75rem'}; // Smaller font for mobile action buttons
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs}; // Reduced padding for mobile
  }
`;

const Description = styled.p`
  font-size: clamp(0.8rem, 1.8vw, 0.9rem); // DESKTOP: Reduced description font size
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
  margin-bottom: 10vh; // Respecting user's direct change
`;

// OTHER PROJECTS
const OtherProjectsSection = styled.section`
  margin-top: auto; // Pushes to bottom on desktop
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
    border-top: none; // Remove border on mobile
  }
`;

const OtherProjectsTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.base}; // Keep as is, or reduce if needed e.g. to 0.9rem
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const OtherProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // DESKTOP: Show 3 projects by default now
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    grid-template-columns: repeat(2, 1fr); // MEDIUM/TABLET: Show 2 projects
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
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

  /* Hide items beyond 3 for desktop (if showing 3 columns) */
  @media (min-width: calc(${({ theme }) => theme.breakpoints.tablet} + 1px)) { // For screens wider than tablet
    &:nth-child(n+4) {
      display: none;
    }
  }

  /* Hide items beyond 2 for tablet/medium (if showing 2 columns) */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    &:nth-child(n+3) {
        display: none;
    }
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
  font-size: ${({ theme }) => theme.typography.sizes.small}; // Keep as is, or reduce e.g. to 0.8rem
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 2px 0;
`;

const OtherProjectCreator = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.small}; // Keep as is, or reduce e.g. to 0.75rem
  opacity: 0.7;
  margin: 0;
`;

const ProjectDetail = ({ project, projectNumber }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Refs for the two image elements for crossfade
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  
  // State to toggle which image is "on top" and controls its opacity
  const [isImage1Active, setIsImage1Active] = useState(true);
  const [activeImageSrc, setActiveImageSrc] = useState(project ? project.images[0] : null);
  const [nextImageSrc, setNextImageSrc] = useState(project && project.images.length > 1 ? project.images[1] : null);

  useEffect(() => {
    if (project) {
      setActiveImageSrc(project.images[currentImageIndex]);
      setNextImageSrc(project.images[(currentImageIndex + 1) % project.images.length]);
    }
  }, [project, currentImageIndex]);

  // Auto-advance currentImageIndex
  useEffect(() => {
    if (!project || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project]);

  // Handle crossfade transition when currentImageIndex changes
  useEffect(() => {
    if (!project || project.images.length <= 1) return;

    // Update the src of the "next" image holder and toggle active image
    if (isImage1Active) {
      // imageRef1 is active (opacity 1), imageRef2 is next (opacity 0)
      // Set imageRef2's source to the new image
      setNextImageSrc(project.images[currentImageIndex]);
    } else {
      // imageRef2 is active (opacity 1), imageRef1 is next (opacity 0)
      // Set imageRef1's source to the new image
      setActiveImageSrc(project.images[currentImageIndex]);
    }
    setIsImage1Active(!isImage1Active);

  }, [currentImageIndex]); // Triggered by auto-advance or manual click
  
  // Manual navigation handler
  const handleThumbnailClick = (index) => {
    if (index === currentImageIndex) return;
    setCurrentImageIndex(index);
  };

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
          {/* Two image components for crossfading */}
          <MainImage 
            ref={imageRef1} 
            $image={isImage1Active ? activeImageSrc : nextImageSrc} 
            style={{ opacity: isImage1Active ? 1 : 0, zIndex: isImage1Active ? 2 : 1 }}
          />
          <MainImage 
            ref={imageRef2} 
            $image={!isImage1Active ? activeImageSrc : nextImageSrc} 
            style={{ opacity: !isImage1Active ? 1 : 0, zIndex: !isImage1Active ? 2 : 1 }}
          />
          <ProjectNumber>{projectNumber}</ProjectNumber>
          <ImageControls>
            {project.images.map((image, index) => (
              <ThumbnailButton
                key={index}
                $image={image}
                $active={index === currentImageIndex}
                onClick={() => handleThumbnailClick(index)} // Updated onClick handler
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
            <MobileTagsText>
              {project.tags.map(tag => `#${tag.replace(/\s+/g, '-')}`).join(' ')}
            </MobileTagsText>
            
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