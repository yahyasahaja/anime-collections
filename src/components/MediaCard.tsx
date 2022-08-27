/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import  { Media } from 'types/models';

type Props = {
  media: Media
}

const BasePageLayout = ({ media, ...attributes }: Props) => {
  return (
    <div {...attributes} css={css`
      padding: 10px;
    `}>
      <div css={css`
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 0px 1px 30px gainsboro;
      `}>
        <img
          css={css`
            width: 100%;
            height: 300px;
            object-fit: cover;
            object-position: center;
          `}
          src={media.coverImage.extraLarge}
          alt="anime cover"
        />
        <h2 css={css`
          height: 30px;
          font-size: 18px;
          padding: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
        `}>{media.title.romaji}</h2>
      </div>
    </div>
  )
};

export default BasePageLayout;
