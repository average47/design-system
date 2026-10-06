import type { CSSProperties } from 'react';
import styles from './BrandCard.module.css';

/** Mirrors the Figma `Card` variant (`Property 1`). `responsive` switches from mobile to desktop at 1024px. */
export type BrandCardSize = 'desktop' | 'mobile' | 'responsive';

export interface BrandCardProps {
  /** Service category shown at the bottom of the card. */
  label: string;
  /** Brand logo rendered at the top of the card. */
  logoSrc: string;
  /** Accessible name for the logo, usually the brand name. */
  logoAlt: string;
  /** Decorative background image. The dark top/bottom gradients are always layered on top of it. */
  backgroundImage?: string;
  /** When provided, the whole card is rendered as a link. */
  href?: string;
  size?: BrandCardSize;
  className?: string;
}

export function BrandCard({
  label,
  logoSrc,
  logoAlt,
  backgroundImage,
  href,
  size = 'desktop',
  className,
}: BrandCardProps) {
  const classes = [styles.card, styles[size], href && styles.link, className].filter(Boolean).join(' ');
  const style = backgroundImage
    ? ({ '--brand-card-image': `url(${JSON.stringify(backgroundImage)})` } as CSSProperties)
    : undefined;

  const content = (
    <>
      <img className={styles.logo} src={logoSrc} alt={logoAlt} />
      <p className={styles.label}>{label}</p>
    </>
  );

  return href ? (
    <a className={classes} style={style} href={href}>
      {content}
    </a>
  ) : (
    <div className={classes} style={style}>
      {content}
    </div>
  );
}
