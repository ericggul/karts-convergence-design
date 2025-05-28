import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background-color: transparent;
  z-index: ${({ theme }) => theme.zIndex.modal};
  pointer-events: none; /* Allow clicks through */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 50px;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const HeaderText = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.secondary};
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  opacity: 0.8;
  letter-spacing: 0.05em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.small};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText>Convergence Design III</HeaderText>
      <HeaderText>K-Arts</HeaderText>
    </HeaderContainer>
  );
};

export default Header; 