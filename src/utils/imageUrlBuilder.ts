import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@/utils/sanityClient";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

type Crop = {
  __typename?: "SanityImageCrop" | undefined;
  bottom?: number | null | undefined;
  left?: number | null | undefined;
  top?: number | null | undefined;
  right?: number | null | undefined;
};

export function getImageUrl(source: SanityImageSource, width: number, height: number, cropDimentions: Crop | null | undefined): string {
  const crop = {
    left: cropDimentions?.left || 0,
    right: cropDimentions?.right || 0,
    top: cropDimentions?.top || 0,
    bottom: cropDimentions?.bottom || 0,
  };

  // compute the cropped image's area
  const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)));
  const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)));

  // compute the cropped image's position
  const left = Math.floor(width * crop.left);
  const top = Math.floor(height * crop.top);

  // gather into a url
  return builder.image(source).rect(left, top, croppedWidth, croppedHeight).fit("max").auto("format").dpr(2).url();
}