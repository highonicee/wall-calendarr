// Floral image header — no changes needed here from last version
import Image from "next/image";

const MONTH_IMAGE_NAMES = [
  "january","february","march","april",
  "may","june","july","august",
  "september","october","november","december",
];

type Props = { month: number };

export default function HeaderImage({ month }: Props) {
  const name = MONTH_IMAGE_NAMES[month];
  return (
    <div className="w-full h-52 sm:h-72 relative overflow-hidden rounded-t-2xl">
      <Image
        src={`/images/${name}.jpeg`}
        alt={`${name} floral`}
        fill
        className="object-cover object-center transition-all duration-700"
        priority
      />
    </div>
  );
}