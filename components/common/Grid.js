import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  gap: 0; /* Remove gaps for seamless adjacency */
  background-color: ${({ theme }) => theme.colors.secondary};
  
  /* Desktop: 3x3 Grid */
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(3, ${({ theme }) => theme.grid.desktop});
    grid-template-rows: repeat(3, 33.333vh);
  }
  
  /* Mobile: 2 Column Grid */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, ${({ theme }) => theme.grid.mobile});
    grid-template-rows: repeat(5, 20vh);
    height: auto;
    min-height: 100vh;
  }
`;

export const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.accent};
  
  /* Last item on mobile spans full width */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &:nth-child(9) {
      grid-column: 1 / -1;
    }
  }
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform ${({ theme }) => theme.transitions.medium};
  
  ${GridItem}:hover & {
    transform: scale(1.02); /* More subtle scale effect */
  }
`;

export const ProjectNumber = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.xl}; /* Large font */
  font-weight: ${({ theme }) => theme.typography.weights.regular}; /* Subtle weight */
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7; /* Subtle opacity */
  z-index: ${({ theme }) => theme.zIndex.overlay};
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3); /* Subtle shadow for readability */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.large};
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
  }
`;

export const HoverOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%; /* Bottom portion only */
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  ); /* Blurry gradient background */
  backdrop-filter: blur(2px); /* Blur effect */
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.lg};
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.medium};
  z-index: ${({ theme }) => theme.zIndex.overlay};
  
  ${GridItem}:hover & {
    opacity: 1;
  }
`;

export const ProjectTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.medium};
  }
`;

export const CreatorName = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  opacity: 0.9;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
  }
`; 