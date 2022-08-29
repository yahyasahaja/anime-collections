/** @jsxImportSource @emotion/react */
import React from 'react';

export type SourceAttributes = React.ClassAttributes<HTMLSourceElement> & React.SourceHTMLAttributes<HTMLSourceElement>;

export type LazyLoadImageProps = {
  sources?: SourceAttributes[],
  src: string,
  alt: string,
  fallback?: string,
};

const LazyLoadImage = ({
  src,
  alt,
  sources = [],
  fallback = '/images/image-placeholder.jpeg',
  ...imgAttributes
}: LazyLoadImageProps) => {
  const [ isError, setIsError ] = React.useState(false)
  const finalSources = React.useMemo(() => {
    if (!isError) return sources;
    return sources.map(source => ({ ...source, srcset: fallback }))
  }, [ isError, sources, fallback ]);

  const finalSrc = React.useMemo(() => {
    if (!isError) return src;
    return fallback;
  }, [ isError, src, fallback ]);

  const handleError = React.useCallback(() => setIsError(true), [setIsError]);

  return (
    <picture>
      {finalSources.map((finalSource, i) => (
        <source key={i} {...finalSource} />
      ))}
      <img src={finalSrc} loading="lazy" alt={alt} {...imgAttributes} onError={handleError} />
    </picture>
  )
}

export default LazyLoadImage;
