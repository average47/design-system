import { useId, type MouseEventHandler, type ReactNode } from 'react';
import { BrandCard, type BrandCardProps } from './BrandCard';
import styles from './BrandCards.module.css';

/** Mirrors the Figma `BrandCards` variant (`Breakpoint`). `responsive` switches from mobile to desktop at 1024px. */
export type BrandCardsBreakpoint = 'desktop' | 'mobile' | 'responsive';

export interface BrandCardsItem extends Omit<BrandCardProps, 'size' | 'className'> {
  /** Stable key for the item; falls back to its index. */
  id?: string;
}

export interface BrandCardsCta {
  label: string;
  /** Renders the CTA as a link; otherwise it is a button. */
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export interface BrandCardsProps {
  headline: ReactNode;
  headingLevel?: 2 | 3 | 4;
  items: BrandCardsItem[];
  cta?: BrandCardsCta;
  breakpoint?: BrandCardsBreakpoint;
  className?: string;
}

export function BrandCards({
  headline,
  headingLevel = 2,
  items,
  cta,
  breakpoint = 'responsive',
  className,
}: BrandCardsProps) {
  const headingId = useId();
  const Heading = `h${headingLevel}` as const;
  const classes = [styles.root, styles[breakpoint], className].filter(Boolean).join(' ');

  return (
    <section className={classes} aria-labelledby={headingId}>
      <div className={styles.content}>
        <Heading id={headingId} className={styles.headline}>
          {headline}
        </Heading>
        <ul className={styles.cards}>
          {items.map(({ id, ...card }, index) => (
            <li key={id ?? index} className={styles.item}>
              <BrandCard {...card} size={breakpoint} />
            </li>
          ))}
        </ul>
      </div>
      {cta &&
        (cta.href ? (
          <a className={styles.cta} href={cta.href} onClick={cta.onClick}>
            {cta.label}
          </a>
        ) : (
          <button type="button" className={styles.cta} onClick={cta.onClick}>
            {cta.label}
          </button>
        ))}
    </section>
  );
}
