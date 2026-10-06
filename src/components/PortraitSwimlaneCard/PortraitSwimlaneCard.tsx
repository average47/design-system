import { forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';

import './PortraitSwimlaneCard.css';

export type PortraitSwimlaneCardBreakpoint = 'desktop' | 'mobile';

export interface PortraitSwimlaneCardProps extends HTMLAttributes<HTMLElement> {
  /** Card size for the target viewport. Maps to the Figma `Breakpoint` variant. */
  breakpoint?: PortraitSwimlaneCardBreakpoint;
  /** URL of the 2:3 portrait artwork (cover-fit). */
  image?: string;
  /**
   * Accessible name for the artwork, usually the title name. Leave empty when
   * the card is purely decorative or labelled by its children.
   */
  alt?: string;
  /** Destination for the title. When set, the card renders as a link. */
  href?: string;
}

/**
 * Portrait (2:3) title artwork used in swimlanes. Renders as an `<a>` when
 * `href` is supplied, otherwise as a static `<div>`.
 */
export const PortraitSwimlaneCard = forwardRef<HTMLElement, PortraitSwimlaneCardProps>(
  function PortraitSwimlaneCard(
    { breakpoint = 'desktop', image, alt = '', href, className, children, ...rest },
    ref,
  ) {
    const classes = [
      'ds-portrait-card',
      `ds-portrait-card--${breakpoint}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {image ? <img className="ds-portrait-card__image" src={image} alt={alt} /> : null}
        {children}
      </>
    );

    if (href != null) {
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }

    return (
      <div ref={ref as Ref<HTMLDivElement>} className={classes} {...rest}>
        {content}
      </div>
    );
  },
);
