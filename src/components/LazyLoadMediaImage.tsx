/** @jsxImportSource @emotion/react */
import React from 'react';
import { Media } from 'types/models';
import LazyLoadImage, { SourceAttributes } from './LazyLoadImage';

type Props = {
  media?: Media,
  useCover?: boolean,
  useBanner?: boolean,
}

const LazyLoadMediaImage = ({ media, useCover = false, useBanner = false, ...imgAttributes }: Props) => {
  const fallback = '/images/image-placeholder.jpeg';
  const finalSrc = React.useMemo(() => {
    if (useCover) return media?.coverImage.extraLarge || fallback;
    else return media?.bannerImage || media?.coverImage.extraLarge || fallback;
  }, [media, useCover]);

  const finalSources = React.useMemo(() => {
    if (useCover) {
      const sources = [] as SourceAttributes[];
      if (media?.coverImage?.extraLarge) sources.push({
        srcSet: media.coverImage.extraLarge,
        media: '(min-width: 400px)',
      });
      if (media?.coverImage?.large) sources.push({
        srcSet: media?.coverImage.large,
        media: '(min-width: 360px)',
      });
      if (media?.coverImage?.medium) sources.push({
        srcSet: media?.coverImage.medium,
        media: '(min-width: 300px)',
      });

      return sources;
    }

    return [];
  }, [media, useCover]);

  return <LazyLoadImage src={finalSrc} sources={finalSources} alt="Anime Cover" {...imgAttributes} />
}

export default LazyLoadMediaImage;
