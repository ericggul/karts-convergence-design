import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// HEADER (Homepage와 동일)
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
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50px;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
  letter-spacing: 0.1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
  }
`;

const BackButton = styled.button`
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

// MAIN CONTENT
const MainContainer = styled(motion.main)`
  padding-top: 60px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 50px;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const AboutNumber = styled(motion.div)`
  font-family: ${({ theme }) => theme.typography.mono}, monospace;
  font-size: 120px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 72px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: -0.02em;
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.typography.sizes.large};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.7;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  letter-spacing: 0.02em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.medium};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const TextBlock = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Paragraph = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.sizes.medium};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: 0.01em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.base};
    line-height: 1.7;
  }
`;

const HighlightText = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const InfoItem = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid rgba(0,0,0,0.1);
  background-color: rgba(0,0,0,0.02);
`;

const InfoLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.mono}, monospace;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const InfoContent = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.5;
`;

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


const About = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <>
      <Header>
        <Logo>Convergence Design | K-Arts</Logo>
        <BackButton onClick={handleBackClick}>Home</BackButton>
      </Header>
      
      <MainContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ContentWrapper>
          <AboutNumber variants={itemVariants}>00</AboutNumber>
          
          <Title variants={itemVariants}>
            K-Arts Convergence Design 3
          </Title>
          
          <Subtitle variants={itemVariants}>
            Creative Frontend Web Development Projects
            <br />
            by Design Department, K-Arts & Jeanyoon Choi
          </Subtitle>
          
        
          <TextBlock variants={itemVariants}>
            <Paragraph>
              이 사이트는 <HighlightText>Next.js</HighlightText>와 <HighlightText>Styled-components</HighlightText>로 
              구축된 포트폴리오 아카이브입니다.
            </Paragraph>
            
            <Paragraph>
              총 <HighlightText>9개의 웹 프로젝트</HighlightText>를 미니멀한 그리드 레이아웃으로 
              전시하며, 각 프로젝트의 상세 정보와 라이브 데모를 확인할 수 있습니다.
            </Paragraph>
            
            <Paragraph>
              반응형 디자인과 <HighlightText>Framer Motion</HighlightText> 애니메이션을 통해 
              현대적인 사용자 경험을 제공합니다.
            </Paragraph>
          </TextBlock>
          
          <InfoGrid variants={itemVariants}>
            <InfoItem>
              <InfoLabel>Framework</InfoLabel>
              <InfoContent>Next.js</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Styling</InfoLabel>
              <InfoContent>Styled-components</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Animation</InfoLabel>
              <InfoContent>Framer Motion</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Language</InfoLabel>
              <InfoContent>JavaScript</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Projects</InfoLabel>
              <InfoContent>9 Web Projects</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Design</InfoLabel>
              <InfoContent>Minimal Grid Layout</InfoContent>
            </InfoItem>
          </InfoGrid>
        </ContentWrapper>
      </MainContainer>
    </>
  );
};

export default About; 