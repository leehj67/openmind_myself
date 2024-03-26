import styled from 'styled-components';

const BasicButton = styled.button`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height || 46}px;
  border-radius: 8px;
  background-color: ${({ $bright }) => $bright ? 'var(--btColor2)' : 'var(--btColor1)'};
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ $bright }) => $bright ? 'var(--btFontColor2)' : 'var(--btFontColor1)'};
  border: 1px solid ${({ $bright }) => $bright ? 'var(--btBorderColor)' : 'var(--btColor1)'};
  opacity: ${({ $inactive }) => $inactive ? 0.5 : 1};
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $inactive }) => $inactive ? 'default' : 'pointer'};

  &:not([disabled]):hover {
    border: 2px solid var(--brown40);
  }

  &:not([disabled]):active {
    border: 2px solid var(--brown50);
    background-color: ${({ $bright }) => $bright ? 'var(--brown20)' : 'var(--brown50)'};
  }
`;

const FloatingButton = styled(BasicButton)`
  box-shadow: 0 4px 4px 0 #00000040;
  border-radius: 200px;
`;

const Button = ({ children, className, onClick, width, height, bright, inactive = false, variant }) => {
  const buttonProps = {
    onClick,
    className,
    $width: width,
    $height: height,
    $bright: bright,
    $inactive: inactive,
    disabled: inactive,
  };

  if (variant === 'icon') {
    return <button {...buttonProps}>{children}</button>;
  } else if (variant === 'floating') {
    return <FloatingButton {...buttonProps}>{children}</FloatingButton>;
  } else {
    return <BasicButton {...buttonProps}>{children}</BasicButton>;
  }
};

export default Button;
