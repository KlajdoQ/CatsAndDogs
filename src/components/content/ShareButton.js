import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

export default function ShareButton({ animal }) {
  const shareUrl = `http://localhost:3000/animals/${animal.id}`;
  const title = animal.name;
  return (
    <div className="share-button">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
}