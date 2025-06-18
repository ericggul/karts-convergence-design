import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small}; // Smaller font for mobile header
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
  width: 100vw;
  height: 100vh;
  gap: 2px;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 60px; // Make space for fixed header
  box-sizing: border-box;
  
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

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.4s ease;
  
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

const Homepage = () => {
  const router = useRouter();

  const handleProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  const handleAboutClick = () => {
    router.push('/about');
  };

  // About과 Projects를 합쳐서 하나의 배열로 만들기
  const allItems = [ABOUT_INFO, ...PROJECTS];

  return (
    <>
      <Header>
        <Logo>Convergence Design III | K-Arts</Logo>
      </Header>
      <GridContainer
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {allItems.map((item, index) => (
          <GridItem
            key={item.id}
            variants={gridItemVariants}
            onClick={() => item.type === 'about' ? handleAboutClick() : handleProjectClick(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.type === 'about' ? handleAboutClick() : handleProjectClick(item.id);
              }
            }}
            aria-label={item.type === 'about' ? `View about page` : `View project ${item.title} by ${item.name}`}
          >
            <ProjectImage $image={item.images[0]} />
            <ProjectNumber>{index.toString().padStart(2, '0')}</ProjectNumber>
            <HoverOverlay>
              <ProjectInfo>
                <ProjectTitle>{item.title}</ProjectTitle>
                <ProjectCreator>{item.name}</ProjectCreator>
              </ProjectInfo>
            </HoverOverlay>
          </GridItem>
        ))}
      </GridContainer>
    </>
  );
};

export default Homepage; 