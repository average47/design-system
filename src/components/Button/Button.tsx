import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonBreakpoint = 'desktop' | 'mobile';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Maps to the Figma `Type` variant. */
  variant?: ButtonVariant;
  /**
   * Sizing for the target layout. Maps to the Figma `Breakpoint` variant.
   * The design only defines a mobile size for `primary`; other variants
   * render at their desktop size regardless of this value.
   */
  breakpoint?: ButtonBreakpoint;
  /** Decorative icon rendered before the label (e.g. `<PlayIcon />`). */
  icon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    breakpoint = 'desktop',
    icon,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${breakpoint}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {icon ? (
        <span className="ds-button__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="ds-button__label">{children}</span>
    </button>
  );
});
