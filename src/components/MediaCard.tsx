/** @jsxImportSource @emotion/react */
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import { Media } from 'types/models';

type Props = {
  media: Media
}

const BasePageLayout = ({ media, ...attributes }: Props) => (
  <Link {...attributes} to={`/animes/${media.idMal}`} css={css`
    padding: 10px;
    display: block;
    &:active {
      opacity: 0.5;
    }
  `}>
    <div css={css`
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0px 1px 30px gainsboro;
    `}>
      <div>
        <LazyLoadImage
          css={css`
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
          `}
          src={media.coverImage.extraLarge}
          placeholderSrc="/images/image-placeholder.jpeg"
          alt="anime cover"
        />
      </div>
      <h2 css={css`
        height: 30px;
        font-size: 18px;
        padding: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        max-width: 80%;
        margin: auto;
      `}>{media.title.romaji}</h2>
    </div>
  </Link>
)

export default BasePageLayout;
