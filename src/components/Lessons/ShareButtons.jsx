import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ShareButtons({ url, title }) {
  const shareTitle = `Check out this lesson: ${title || ""}`.trim();

  if (!url) return null;

  return (
    <div className="flex items-center gap-2">
      <FacebookShareButton url={url} quote={shareTitle}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={shareTitle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={shareTitle}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
