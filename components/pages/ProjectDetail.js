import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../utils/constant/dummy';
import LoadingSpinner from '../common/LoadingSpinner';

// Animation variants
const subtleFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Adjust stagger delay
    },
  },
};

const PageWrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  min-height: 100vh;
`;

// HEADER
const AnimatedHeader = styled(motion.header)`
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
const DetailGrid = styled(motion.main)`
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
const ImageColumn = styled(motion.div)`
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    opacity: 1; // Override for mobile - no fade-in animation
    transform: translateY(0px); // Override for mobile - no slide-up animation
  }
`;

// New wrapper for main images to control their height separately on mobile
const MainImageWrapper = styled.div`
  position: relative; // For absolute positioning of MainImage components within
  width: 100%;
  flex-grow: 1; // Allows this wrapper to take up available space minus controls
  overflow: hidden; // If images are larger than this container by mistake
  height: calc(100vh - 80px); // Default for mobile, overridden by flex-grow effectively if ImageColumn height is fixed
`;

const MainImage = styled.div`
  position: absolute; // Stays absolute for crossfade
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; // Will be 100% of MainImageWrapper
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;

  /* No mobile-specific changes needed here now for position/height */
`;

const AnimatedProjectNumber = styled(motion.div)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.typography.mono}, monospace;
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
    opacity: 1; // Override for mobile - no fade-in animation
    transform: translateY(0px); // Override for mobile - no slide-up animation
  }
`;

const AnimatedImageControls = styled(motion.div)`
  position: absolute; // Default for desktop
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: ${({ theme }) => theme.zIndex.overlay};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative; 
    bottom: auto;
    left: auto;
    right: auto;
    width: 100%;
    height: 80px; 
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    justify-content: center;
    align-items: center;
    flex-shrink: 0; 
    opacity: 1 !important; // Force container opacity for mobile
    transform: none !important; // Force no transform for mobile container
  }
`;

const AnimatedThumbnailButton = styled(motion.button)`
  flex: 1;
  height: 80px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  border: 2px solid ${({ $active, theme }) => 
    $active ? theme.colors.secondary : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  transition: all 0.2s ease; // CSS transition for hover/active states
  opacity: ${({ $active }) => $active ? 1 : 0.7}; // Base opacity based on active state
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    opacity: 1; // Hover opacity
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 60px;
    flex: 0 1 auto; 
    min-width: 60px; 
    // Opacity is now handled by the base rule and $active prop
    // We only force the transform to prevent the slide-up from framer-motion
    transform: none !important; 
  }
`;

// RIGHT COLUMN (CONTENT)
const ContentColumn = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
    height: auto; // Allow content to dictate height
  }
`;

const AnimatedProjectInfoSection = styled(motion.section)`
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

const AnimatedProjectTitle = styled(motion.h1)`
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

const AnimatedCreatorName = styled(motion.p)`
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

const AnimatedTagsContainer = styled(motion.div)`
  display: grid;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const AnimatedMobileTagsText = styled(motion.p)`
  display: none;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7;
  line-height: 1.5;
  margin: ${({ theme }) => theme.spacing.md} 0;
  word-wrap: break-word;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const AnimatedTag = styled(motion.div)`
  ${BrutalGridItemStyles} 

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    font-size: clamp(0.7rem, 1.3vw, 0.8rem);
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs || '0.75rem'};
    padding: ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }
`;

const AnimatedActionsContainer = styled(motion.div)`
  display: grid;
  gap: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
  grid-template-columns: 1fr;
`;

const AnimatedActionButton = styled(motion.a)`
  ${BrutalGridItemStyles} 
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xs || '0.75rem'};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  }
`;

const AnimatedDescription = styled(motion.p)`
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  line-height: 1.6;
  opacity: 0.8;
  margin: 0;
  margin-bottom: 10vh;
`;

// OTHER PROJECTS
const AnimatedOtherProjectsSection = styled(motion.section)`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
    border-top: none;
  }
`;

const AnimatedOtherProjectsTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
`;

const AnimatedOtherProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const AnimatedOtherProjectItem = styled(motion.a)`
  position: relative;
  aspect-ratio: 1 / 0.75;
  overflow: hidden;
  display: block;
  text-decoration: none;

  &::before {
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
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 70%);
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 0.5;
  }

  @media (min-width: calc(${({ theme }) => theme.breakpoints.tablet} + 1px)) {
    &:nth-child(n+4) {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) and (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    &:nth-child(n+3) {
        display: none;
    }
  }

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

  if (router.isFallback || !project) {
    return (
      <PageWrapper 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
      >
        <LoadingSpinner />
      </PageWrapper>
    );
  }

  const handleBackClick = () => router.push('/');
  const handleOtherProjectClick = (projectId) => router.push(`/project/${projectId}`);

  const otherProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 4);

  return (
    <PageWrapper initial="hidden" animate="visible" variants={staggerContainer}>
      <AnimatedHeader variants={subtleFadeInUp}>
        <Logo>Convergence Design III | K-Arts</Logo>
        <HomeButton onClick={handleBackClick}>Home</HomeButton>
      </AnimatedHeader>

      <DetailGrid variants={staggerContainer}>
        <ImageColumn variants={subtleFadeInUp}>
          <MainImageWrapper>
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
          </MainImageWrapper>
          <AnimatedProjectNumber variants={subtleFadeInUp}>{projectNumber}</AnimatedProjectNumber>
          <AnimatedImageControls variants={staggerContainer}>
            {project.images.map((image, index) => (
              <AnimatedThumbnailButton
                key={index}
                $image={image}
                $active={index === currentImageIndex}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
                variants={subtleFadeInUp}
              />
            ))}
          </AnimatedImageControls>
        </ImageColumn>

        <ContentColumn variants={staggerContainer}>
          <AnimatedProjectInfoSection variants={staggerContainer}>
            <motion.div variants={subtleFadeInUp}>
              <AnimatedProjectTitle variants={subtleFadeInUp}>{project.title}</AnimatedProjectTitle>
              <AnimatedCreatorName variants={subtleFadeInUp}>{project.name}</AnimatedCreatorName>
            </motion.div>
            
            <AnimatedTagsContainer variants={staggerContainer}>
              {project.tags.map((tag, index) => (
                <AnimatedTag key={index} variants={subtleFadeInUp}>{tag}</AnimatedTag>
              ))}
            </AnimatedTagsContainer>
            <AnimatedMobileTagsText variants={subtleFadeInUp}>
              {project.tags.map(tag => `#${tag.replace(/\s+/g, '-')}`).join(' ')}
            </AnimatedMobileTagsText>
            
            <AnimatedActionsContainer variants={staggerContainer}>
              <AnimatedActionButton href={project.webLink} target="_blank" rel="noopener noreferrer" variants={subtleFadeInUp}>
                Visit Website
              </AnimatedActionButton>
              <AnimatedActionButton href={project.githubLink} target="_blank" rel="noopener noreferrer" variants={subtleFadeInUp}>
                GitHub Repository
              </AnimatedActionButton>
            </AnimatedActionsContainer>
            
            <AnimatedDescription variants={subtleFadeInUp}>{project.description}</AnimatedDescription>
          </AnimatedProjectInfoSection>

          <AnimatedOtherProjectsSection variants={staggerContainer}>
            <AnimatedOtherProjectsTitle variants={subtleFadeInUp}>More Projects</AnimatedOtherProjectsTitle>
            <AnimatedOtherProjectsGrid variants={staggerContainer}>
              {otherProjects.map((op) => (
                <AnimatedOtherProjectItem
                  key={op.id}
                  $image={op.images[0]}
                  href={`/project/${op.id}`}
                  onClick={(e) => { e.preventDefault(); handleOtherProjectClick(op.id); }}
                  aria-label={`View project ${op.title} by ${op.name}`}
                  variants={subtleFadeInUp}
                >
                  <OtherProjectInfo>
                    <OtherProjectName>{op.title}</OtherProjectName>
                    <OtherProjectCreator>{op.name}</OtherProjectCreator>
                  </OtherProjectInfo>
                </AnimatedOtherProjectItem>
              ))}
            </AnimatedOtherProjectsGrid>
          </AnimatedOtherProjectsSection>
        </ContentColumn>
      </DetailGrid>
    </PageWrapper>
  );
};

export default ProjectDetail; 