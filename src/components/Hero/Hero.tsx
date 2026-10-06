import { useId } from 'react';
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';
import { MosaicLogo } from './MosaicLogo';
import styles from './Hero.module.css';

/** Figma `Breakpoint` variant. */
export type HeroBreakpoint = 'mobile' | 'desktop';

export interface HeroProps extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  /**
   * Force a layout. When omitted the hero is responsive: mobile layout below
   * 768px, desktop layout from 768px up.
   */
  breakpoint?: HeroBreakpoint;
  /** Brand mark shown above the headline. Defaults to the Mosaic logo. */
  logo?: ReactNode;
  headline?: ReactNode;
  /** Heading level for the headline. Use `h2` when the page already has an `h1`. */
  headlineAs?: 'h1' | 'h2';
  subheader?: ReactNode;
  /** Pricing tout, e.g. "Plans start at $6.99/month". */
  pricing?: ReactNode;
  /** Offer terms / legal copy. */
  legal?: ReactNode;
  ctaLabel?: ReactNode;
  /** Renders the CTA as a link when set, otherwise as a button. */
  ctaHref?: string;
  onCtaClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /** URL of the background image. A dark fallback colour is used underneath. */
  backgroundImage?: string;
  showLogo?: boolean;
  showHeadline?: boolean;
  showSubheader?: boolean;
  showPricing?: boolean;
  showLegal?: boolean;
  showCta?: boolean;
}

/**
 * Marketing hero with logo, headline, subheader, pricing tout, legal copy and
 * a primary CTA (Figma: Hero, 61:4455).
 */
export function Hero({
  breakpoint,
  logo = <MosaicLogo />,
  headline,
  headlineAs: Heading = 'h1',
  subheader,
  pricing,
  legal,
  ctaLabel,
  ctaHref,
  onCtaClick,
  backgroundImage,
  showLogo = true,
  showHeadline = true,
  showSubheader = true,
  showPricing = true,
  showLegal = true,
  showCta = true,
  className,
  style,
  ...rest
}: HeroProps) {
  const headlineId = useId();

  const hasLogo = showLogo && logo != null;
  const hasHeadline = showHeadline && headline != null;
  const hasSubheader = showSubheader && subheader != null;
  const hasPricing = showPricing && pricing != null;
  const hasLegal = showLegal && legal != null;
  const hasCta = showCta && ctaLabel != null;

  const hasHeading = hasHeadline || hasSubheader;
  const hasCopy = hasHeading || hasPricing;
  const hasBody = hasLogo || hasCopy || hasLegal;

  const rootClassName = [
    styles.root,
    breakpoint ? styles[breakpoint] : styles.responsive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={rootClassName}
      style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")`, ...style } : style}
      aria-labelledby={hasHeadline ? headlineId : undefined}
      {...rest}
    >
      <div className={styles.inner}>
        {hasBody && (
          <div className={styles.body}>
            {hasLogo && <div className={styles.logo}>{logo}</div>}

            {hasCopy && (
              <div className={styles.copy}>
                {hasHeading && (
                  <div className={styles.heading}>
                    {hasHeadline && (
                      <Heading id={headlineId} className={styles.headline}>
                        {headline}
                      </Heading>
                    )}
                    {hasSubheader && <p className={styles.subheader}>{subheader}</p>}
                  </div>
                )}
                {hasPricing && <p className={styles.pricing}>{pricing}</p>}
              </div>
            )}

            {hasLegal && <p className={styles.legal}>{legal}</p>}
          </div>
        )}

        {hasCta &&
          (ctaHref ? (
            <a className={styles.cta} href={ctaHref} onClick={onCtaClick}>
              {ctaLabel}
            </a>
          ) : (
            <button type="button" className={styles.cta} onClick={onCtaClick}>
              {ctaLabel}
            </button>
          ))}
      </div>
    </section>
  );
}
