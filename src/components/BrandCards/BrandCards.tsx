import { forwardRef, useId } from 'react';
import type { HTMLAttributes, Key, ReactNode } from 'react';

import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import { PortraitSwimlaneCard } from '../PortraitSwimlaneCard';
import type { PortraitSwimlaneCardProps } from '../PortraitSwimlaneCard';

import './BrandCards.css';

export type BrandCardsBreakpoint = 'desktop' | 'mobile';

export type BrandCardsHeadingLevel = 'h2' | 'h3' | 'h4';

export type BrandCardsCtaProps = Omit<ButtonProps, 'children' | 'variant' | 'breakpoint'>;

export interface BrandCardsItem extends Omit<PortraitSwimlaneCardProps, 'breakpoint'> {
  /** Stable React key for the card. Falls back to the item index. */
  key?: Key;
}

export interface BrandCardsProps extends HTMLAttributes<HTMLElement> {
  /** Layout for the target viewport. Sets the card and CTA sizes. */
  breakpoint?: BrandCardsBreakpoint;
  /** Section heading, e.g. "New On AMC+". */
  headline?: ReactNode;
  /** Element used for the headline. Defaults to `h2`. */
  headlineAs?: BrandCardsHeadingLevel;
  /** Supporting copy below the headline. */
  subheader?: ReactNode;
  /** Label for the primary CTA button. */
  ctaLabel?: ReactNode;
  /** Extra props forwarded to the CTA `<Button>` (e.g. `onClick`). */
  ctaProps?: BrandCardsCtaProps;
  /** Heading above the card row, e.g. "New Arrivals". */
  swimlaneTitle?: ReactNode;
  /** Element used for the swimlane title. Defaults to `h3`. */
  swimlaneTitleAs?: BrandCardsHeadingLevel;
  /** Titles shown in the swimlane as portrait cards. */
  items?: BrandCardsItem[];
  /** URL of the landscape key art shown beside the content. */
  keyArt?: string;
  /** Alt text for the key art. Defaults to decorative (`""`). */
  keyArtAlt?: string;
}

export const BrandCards = forwardRef<HTMLElement, BrandCardsProps>(function BrandCards(
  {
    breakpoint = 'desktop',
    headline,
    headlineAs: Headline = 'h2',
    subheader,
    ctaLabel,
    ctaProps,
    swimlaneTitle,
    swimlaneTitleAs: SwimlaneTitle = 'h3',
    items = [],
    keyArt,
    keyArtAlt = '',
    className,
    ...rest
  },
  ref,
) {
  const swimlaneTitleId = useId();

  const classes = ['ds-brand-cards', `ds-brand-cards--${breakpoint}`, className]
    .filter(Boolean)
    .join(' ');

  const hasHeadline = headline != null;
  const hasSubheader = subheader != null;
  const hasCta = ctaLabel != null;
  const hasCopy = hasHeadline || hasSubheader;
  const hasSwimlaneTitle = swimlaneTitle != null;
  const hasItems = items.length > 0;

  return (
    <section ref={ref} className={classes} {...rest}>
      <div className="ds-brand-cards__inner">
        <div className="ds-brand-cards__content">
          {hasCopy || hasCta ? (
            <div className="ds-brand-cards__intro">
              {hasCopy ? (
                <div className="ds-brand-cards__copy">
                  {hasHeadline ? (
                    <Headline className="ds-brand-cards__headline">{headline}</Headline>
                  ) : null}
                  {hasSubheader ? <p className="ds-brand-cards__subheader">{subheader}</p> : null}
                </div>
              ) : null}

              {hasCta ? (
                <Button
                  {...ctaProps}
                  variant="primary"
                  breakpoint={breakpoint}
                  className={['ds-brand-cards__cta', ctaProps?.className].filter(Boolean).join(' ')}
                >
                  {ctaLabel}
                </Button>
              ) : null}
            </div>
          ) : null}

          {hasSwimlaneTitle || hasItems ? (
            <div className="ds-brand-cards__swimlane">
              {hasSwimlaneTitle ? (
                <SwimlaneTitle id={swimlaneTitleId} className="ds-brand-cards__swimlane-title">
                  {swimlaneTitle}
                </SwimlaneTitle>
              ) : null}

              {hasItems ? (
                <ul
                  className="ds-brand-cards__list"
                  aria-labelledby={hasSwimlaneTitle ? swimlaneTitleId : undefined}
                >
                  {items.map(({ key, ...item }, index) => (
                    <li key={key ?? index} className="ds-brand-cards__item">
                      <PortraitSwimlaneCard {...item} breakpoint={breakpoint} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>

        {keyArt ? (
          <div className="ds-brand-cards__key-art">
            <img className="ds-brand-cards__key-art-image" src={keyArt} alt={keyArtAlt} />
          </div>
        ) : null}
      </div>
    </section>
  );
});
