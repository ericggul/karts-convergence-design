import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { PROJECTS, ABOUT_INFO } from '../../utils/constant/dummy';

// HEADER
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.overlay + 1}; // Ensure header is above grid
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50px; // Reduced header height for mobile
    padding: 0 ${({ theme }) => theme.spacing.md}; // Adjusted padding for mobile
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small}; // Smaller font for mobile header
  }
`;

const AboutButton = styled.button`
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
    content: 'ⓘ';
    font-size: 16px;
  }
`;

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  },
};

const GridContainer = styled(motion.main)`
  display: grid;
  grid-template-columns: repeat(3, 33.333vw);
  grid-template-rows: repeat(3, 33.333vh);
  grid-auto-rows: 33.333vh; // Additional rows for overflow items
  width: 100vw;
  height: 100vh;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 60px; // Make space for fixed header
  box-sizing: border-box;
  overflow-y: auto; // Enable scrolling if content exceeds viewport
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr); // Use 1fr for more robust 2-column layout
    grid-auto-rows: 50vw; // Ensure square aspect ratio for items
    height: auto; // Allow container to grow with content
    min-height: calc(100vh - 50px); // Full viewport height minus header
    overflow-y: auto; // Enable scrolling
    padding-top: 50px; // Make space for fixed header (mobile)
    gap: 2px;
  }
`;

const GridItem = styled(motion.div)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  
  &:hover {
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary}; // Black background during loading
  position: relative;
  overflow: hidden;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.4s ease;
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
  
  ${GridItem}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectNumber = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.mono}, monospace;
  font-size: 72px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: 0.8;
  mix-blend-mode: difference;
  user-select: none;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 36px; // Reduced for mobile
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.9) 0%,
    rgba(0,0,0,0.6) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column; // Align items to bottom
  justify-content: flex-end; // Align items to bottom
  padding: ${({ theme }) => theme.spacing.lg}; // Reduced padding
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
  
  ${GridItem}:hover & {
    opacity: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md}; // Further reduced padding for mobile
  }
`;

const ProjectInfo = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  z-index: 4;
`;

const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
  }
`;

const ProjectCreator = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
  }
`;

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Image preloading hook
const useImagePreloader = (imageSrc) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!imageSrc) return;
    
    setIsLoaded(false);
    setHasError(false);
    
    const img = new Image();
    
    const handleLoad = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    
    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };
    
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    
    img.src = imageSrc;
    
    // If image is already cached, it might load synchronously
    if (img.complete) {
      handleLoad();
    }
    
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [imageSrc]);

  return { isLoaded, hasError };
};

// Individual project item component with image loading
const ProjectItem = ({ item, index, onProjectClick, onAboutClick }) => {
  const imageSrc = item.images && item.images[0] ? item.images[0] : null;
  const { isLoaded } = useImagePreloader(imageSrc);

  const handleClick = useCallback(() => {
    item.type === 'about' ? onAboutClick() : onProjectClick(item.id);
  }, [item, onAboutClick, onProjectClick]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <GridItem
      variants={gridItemVariants}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={item.type === 'about' ? `View about page` : `View project ${item.title} by ${item.name}`}
    >
      <ProjectImageContainer>
        <ProjectImage $image={imageSrc} $loaded={isLoaded} />
      </ProjectImageContainer>
      <ProjectNumber>{index.toString().padStart(2, '0')}</ProjectNumber>
      <HoverOverlay>
        <ProjectInfo>
          <ProjectTitle>{item.title}</ProjectTitle>
          <ProjectCreator>{item.name}</ProjectCreator>
        </ProjectInfo>
      </HoverOverlay>
    </GridItem>
  );
};

// Session-persistent shuffle order
const getSessionShuffledProjects = () => {
  if (typeof window === 'undefined') return PROJECTS; // SSR safety
  
  const sessionKey = 'shuffledProjectOrder';
  const stored = sessionStorage.getItem(sessionKey);
  
  if (stored) {
    try {
      const shuffledIds = JSON.parse(stored);
      // Reconstruct projects array in the stored order
      return shuffledIds.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
    } catch (e) {
      console.warn('Failed to parse stored shuffle order:', e);
    }
  }
  
  // Create new shuffle and store it
  const shuffled = shuffleArray(PROJECTS);
  const shuffledIds = shuffled.map(p => p.id);
  sessionStorage.setItem(sessionKey, JSON.stringify(shuffledIds));
  
  return shuffled;
};

const Homepage = () => {
  const router = useRouter();
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    // Get session-persistent shuffled projects
    const shuffledProjects = getSessionShuffledProjects();
    
    // Show About + all projects (total 10 items)
    setDisplayItems([ABOUT_INFO, ...shuffledProjects]);
  }, []);

  const handleProjectClick = useCallback((projectId) => {
    router.push(`/project/${projectId}`);
  }, [router]);

  const handleAboutClick = useCallback(() => {
    router.push('/about');
  }, [router]);

  const handleLogoClick = useCallback(() => {
    router.push('/about');
  }, [router]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={gridContainerVariants}
      style={{ backgroundColor: '#000000' }}
    >
      <Header>
        <Logo onClick={handleLogoClick}>Convergence Design | K-Arts</Logo>
        <AboutButton onClick={handleAboutClick}>About</AboutButton>
      </Header>
      <GridContainer
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {displayItems.map((item, index) => (
          <ProjectItem
            key={`${item.id}-${index}`} // Use both id and index to ensure uniqueness after shuffle
            item={item}
            index={index}
            onProjectClick={handleProjectClick}
            onAboutClick={handleAboutClick}
          />
        ))}
      </GridContainer>
    </motion.div>
  );
};

export default Homepage; 