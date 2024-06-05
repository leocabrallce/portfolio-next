import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@/utils/sanityClient";
import type { Image } from "@/graphql/generated";

const builder = imageUrlBuilder(sanityClient);

export function getImageUrl(image: Image): string {
  const data = {
    source: image?.asset?.url || "",
    width: image?.asset?.metadata?.dimensions?.width || 300,
    height: image?.asset?.metadata?.dimensions?.height || 300,
    crop: image?.crop
  };

  const crop = {
    left: data.crop?.left || 0,
    right: data.crop?.right || 0,
    top: data.crop?.top || 0,
    bottom: data.crop?.bottom || 0,
  };

  // compute the cropped image's area
  const croppedWidth = Math.floor(data.width * (1 - (crop.right + crop.left)));
  const croppedHeight = Math.floor(data.height * (1 - (crop.top + crop.bottom)));

  // compute the cropped image's position
  const left = Math.floor(data.width * crop.left);
  const top = Math.floor(data.height * crop.top);

  // generate the url
  return builder.image(data.source).rect(left, top, croppedWidth, croppedHeight).fit("max").auto("format").dpr(2).quality(100).url();
}