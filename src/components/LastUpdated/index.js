import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

/**
 * <LastUpdated /> — "Updated October 2026" under a page's heading, from the page's last commit
 * (the same date as the "Last updated" line at the bottom; needs showLastUpdateTime on the docs
 * instance). Renders nothing when the date is unknown. The year matches the {year} in the page's
 * search title, since both come from the same commit.
 */
export default function LastUpdated() {
  const {metadata} = useDoc();
  if (!metadata.lastUpdatedAt) {
    return null;
  }
  const date = new Date(metadata.lastUpdatedAt);
  return (
    <p className={styles.updated}>
      Updated{' '}
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'})}
      </time>
    </p>
  );
}
