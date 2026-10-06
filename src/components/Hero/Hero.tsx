import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { Button } from '../Button';
import type { ButtonProps } from '../Button';
import { MosaicLogo } from './MosaicLogo';

import './Hero.css';

export type HeroBreakpoint = 'desktop' | 'mobile';

export type HeroHeadingLevel = 'h1' | 'h2' | 'h3';

export type HeroCtaProps = Omit<ButtonProps, 'children' | 'variant' | 'breakpoint'>;

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /** Layout for the target viewport. Maps to the Figma `Breakpoint` variant. */
  breakpoint?: HeroBreakpoint;
  /**
   * URL of the full-bleed background image (cover-fit). Falls back to a solid
   * dark surface when omitted.
   */
  backgroundImage?: string;
  /** Brand lockup shown above the headline. Defaults to `<MosaicLogo />`. */
  logo?: ReactNode;
  /** Main heading copy. */
  headline?: ReactNode;
  /** Element used for the headline. Defaults to `h1`. */
  headlineAs?: HeroHeadingLevel;
  /** Supporting copy below the headline. */
  subheader?: ReactNode;
  /** Pricing tout, e.g. "Plans start at $6.99/month". */
  pricing?: ReactNode;
  /** Legal / offer terms fine print. */
  legal?: ReactNode;
  /** Label for the primary CTA button. */
  ctaLabel?: ReactNode;
  /** Extra props forwarded to the CTA `<Button>` (e.g. `onClick`). */
  ctaProps?: HeroCtaProps;
  /** Figma `showLogo` boolean. */
  showLogo?: boolean;
  /** Figma `showHeadline` boolean. */
  showHeadline?: boolean;
  /** Figma `showSubheader` boolean. */
  showSubheader?: boolean;
  /** Figma `showPricing` boolean. */
  showPricing?: boolean;
  /** Figma `showLegal` boolean. */
  showLegal?: boolean;
  /** Figma `showCta` boolean. */
  showCta?: boolean;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    breakpoint = 'desktop',
    backgroundImage,
    logo = <MosaicLogo />,
    headline,
    headlineAs: Headline = 'h1',
    subheader,
    pricing,
    legal,
    ctaLabel,
    ctaProps,
    showLogo = true,
    showHeadline = true,
    showSubheader = true,
    showPricing = true,
    showLegal = true,
    showCta = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const classes = ['ds-hero', `ds-hero--${breakpoint}`, className]
    .filter(Boolean)
    .join(' ');

  const sectionStyle = backgroundImage
    ? { backgroundImage: `url(${JSON.stringify(backgroundImage)})`, ...style }
    : style;

  const hasLogo = showLogo && logo != null;
  const hasHeadline = showHeadline && headline != null;
  const hasSubheader = showSubheader && subheader != null;
  const hasPricing = showPricing && pricing != null;
  const hasLegal = showLegal && legal != null;
  const hasCta = showCta && ctaLabel != null;
  const hasIntro = hasHeadline || hasSubheader;
  const hasCopy = hasIntro || hasPricing || hasLegal;

  return (
    <section ref={ref} className={classes} style={sectionStyle} {...rest}>
      <div className="ds-hero__content">
        {hasLogo ? <div className="ds-hero__logo">{logo}</div> : null}

        {hasCopy || hasCta ? (
          <div className="ds-hero__main">
            {hasCopy ? (
              <div className="ds-hero__copy">
                {hasIntro ? (
                  <div className="ds-hero__intro">
                    {hasHeadline ? (
                      <Headline className="ds-hero__headline">{headline}</Headline>
                    ) : null}
                    {hasSubheader ? <p className="ds-hero__subheader">{subheader}</p> : null}
                  </div>
                ) : null}
                {hasPricing ? <p className="ds-hero__pricing">{pricing}</p> : null}
                {hasLegal ? <p className="ds-hero__legal">{legal}</p> : null}
              </div>
            ) : null}

            {hasCta ? (
              <Button
                {...ctaProps}
                variant="primary"
                breakpoint={breakpoint}
                className={['ds-hero__cta', ctaProps?.className].filter(Boolean).join(' ')}
              >
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
});
