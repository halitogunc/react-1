import {XIcon} from '@primer/octicons-react'
import styled from 'styled-components'
import {variant} from 'styled-system'
import {get} from '../constants'
import {ComponentProps} from '../utils/types'
import {tokenSizes, TokenSizeKeys, defaultTokenSize} from './TokenBase'

interface TokenButtonProps {
  borderOffset?: number
  size?: TokenSizeKeys
  isParentInteractive?: boolean
}

const variants = variant({
  prop: 'size',
  variants: {
    sm: {
      height: tokenSizes.sm,
      width: tokenSizes.sm
    },
    md: {
      height: tokenSizes.md,
      width: tokenSizes.md
    },
    lg: {
      height: tokenSizes.lg,
      width: tokenSizes.lg
    },
    xl: {
      height: tokenSizes.xl,
      width: tokenSizes.xl
    }
  }
})

const getTokenButtonIconSize = (variant?: TokenSizeKeys) => parseInt(tokenSizes[variant || defaultTokenSize], 10) * 0.75

const StyledTokenButton = styled.span<TokenButtonProps>`
  background-color: transparent;
  font-family: inherit;
  color: currentColor;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  appearance: none;
  text-decoration: none;
  padding: 0;
  transform: ${props => `translate(${props.borderOffset}px, -${props.borderOffset}px)`};

  align-self: baseline;
  border: 0;
  border-radius: 999px;

  &:hover,
  &:focus {
    background-color: ${get('colors.fade.fg10')};
  }

  &:active {
    background-color: ${get('colors.fade.fg15')};
  }

  ${variants}
`;

const RemoveTokenButton: React.FC<ComponentProps<typeof StyledTokenButton>> = ({"aria-label": ariaLabel, isParentInteractive, size, children, ...rest }) => {
  return (
    <StyledTokenButton
      as={isParentInteractive ? 'span' : 'button'}
      tabIndex={isParentInteractive ? -1 : undefined}
      aria-label={!isParentInteractive ? 'Remove token' : undefined}
      size={size}
    >
      <XIcon size={getTokenButtonIconSize(size)} />
    </StyledTokenButton>
  )
};

RemoveTokenButton.defaultProps = {
  size: defaultTokenSize
}

export default RemoveTokenButton
