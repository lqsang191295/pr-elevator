import { DIRECTION } from "@/types/elevator";

export default function BtnUp({
  onClick,
}: {
  onClick: (director: string) => void;
}) {
  return (
    <div
      className=" w-8 h-5 flex gap-1 bg-black cursor-pointer rounded-sm items-center justify-center"
      onClick={() => onClick(DIRECTION.UP)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
        />
      </svg>
    </div>
  );
}
