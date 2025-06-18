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

const StudentsCredits = styled(motion.div)`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: 0.05em;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
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
        
          </Subtitle>
          
          <StudentsCredits variants={itemVariants}>
            김민진, 박가인, 박용훈, 신지유, 안은재, 이현지, 장예지, 조수연, 허가은
            <br />
            교수자: 최정윤 & Cursor AI
          </StudentsCredits>
          
          <TextBlock variants={itemVariants}>
            <Paragraph>
              이 사이트는 한국예술종합학교 미술원 디자인과 3학년 
              컨버전스 디자인 3 과목의 학생들이 창작한 
              수업 결과물을 아카이빙하는 포트폴리오입니다.
            </Paragraph>
            
            <Paragraph>
              인공지능과 거대언어모델(LLM)의 부상으로 인터랙티브 디자인의 랜드스케이프가 빠르게 변하고 있습니다. 
              Cursor AI 등 LLM 기반 코드 생성 툴들의 급부상으로 
              전통적인 디자이너와 개발자의 경계가 허물어지고 있으며, 특히 인터랙션 디자이너는 
              개발의 언어를 더욱 깊이 익혀 기존에 없던 형식의 창작물을 만들어낼 기회를 얻었습니다.
            </Paragraph>
            
            <Paragraph>
              본 수업은 이러한 시대적 흐름에 미술대학으로서는 돋보이게 빠른 속도로 대응하여, 
              Cursor AI를 활용한 Next.js와 React 기반 창의적 웹 프로젝트 구현 작업을 진행했습니다. 
              수강생들은 창의적인 디자이너로서 자바스크립트라는 언어를 습득하고, 
              개발의 언어를 통해 Figma, Framer 등 전통적인 툴로는 구현되지 않는 
              디자인적 상상력을 현실화했습니다.
            </Paragraph>
            
            <Paragraph>
              이를 통해 단순히 급변하는 기술적 환경에 대응하는 차원을 넘어, 
              개발자와 디자이너 간 경계가 허물어지는 지금 
              인터랙션 디자인의 미래를 상상하고 
              미래의 디자이너가 어떤 자질을 갖춰야 할지에 대해 고찰할 기회를 제공합니다.
            </Paragraph>

            <Paragraph style={{ 
              fontStyle: 'italic', 
              opacity: 0.6, 
              fontSize: '0.85em', 
              textAlign: 'right',
              marginTop: '2rem',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              paddingTop: '1rem'
            }}>
              2025.06.18<br />
              디자인과 강사 최정윤, Claude 4.0 & Cursor AI 
            </Paragraph>
          </TextBlock>
          
          <TextBlock variants={itemVariants}>
            <Paragraph style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '0.95em' }}>
              This portfolio archives the creative works of third-year students from the 
              Design Department at Korea National University of Arts in their 
              Convergence Design 3 course.
            </Paragraph>
            
            <Paragraph style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '0.95em' }}>
              As artificial intelligence and Large Language Models (LLMs) reshape the landscape of interactive design, 
              the rapid emergence of LLM-based code generation tools like Cursor AI is 
              dissolving traditional boundaries between designers and developers. Interactive designers now have 
              unprecedented opportunities to master development languages and create entirely new forms of creative expression.
            </Paragraph>
            
            <Paragraph style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '0.95em' }}>
              This course responds to these technological shifts with remarkable agility for an art school, 
              implementing creative web projects using Cursor AI with Next.js and React. 
              Students acquired JavaScript as creative designers, utilizing development languages to realize 
              design imagination that transcends the limitations of traditional tools like Figma and Framer.
            </Paragraph>
            
            <Paragraph style={{ fontStyle: 'italic', opacity: 0.8, fontSize: '0.95em' }}>
              Beyond merely adapting to rapidly evolving technological environments, 
              this approach provides an opportunity to envision the future of interaction design 
              and contemplate what qualities future designers should possess as the boundaries between 
              developers and designers continue to blur.
            </Paragraph>
            
            <Paragraph style={{ 
              fontStyle: 'italic', 
              opacity: 0.6, 
              fontSize: '0.85em', 
              textAlign: 'right',
              marginTop: '2rem',
              borderTop: '1px solid rgba(0,0,0,0.1)',
              paddingTop: '1rem'
            }}>
              2025.06.18<br />
              Lecturer Jeanyoon Choi, Claude 4.0 & Cursor AI 
            </Paragraph>
          </TextBlock>
          
          <InfoGrid variants={itemVariants}>
            <InfoItem>
              <InfoLabel>Institution</InfoLabel>
              <InfoContent>K-Arts</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>School</InfoLabel>
              <InfoContent>School of Visual Arts</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Department</InfoLabel>
              <InfoContent>Department of Design</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Course</InfoLabel>
              <InfoContent>Convergence Design III</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Semester</InfoLabel>
              <InfoContent>2025 Spring Semester</InfoContent>
            </InfoItem>
            
            <InfoItem>
              <InfoLabel>Projects</InfoLabel>
              <InfoContent>9 Projects</InfoContent>
            </InfoItem>
          </InfoGrid>
        </ContentWrapper>
      </MainContainer>
    </>
  );
};

export default About; 