import { DIRECTION } from "@/types/elevator";

export default function BtnUpDown({
  onClick,
}: {
  onClick: (director: string) => void;
}) {
  return (
    <div className="w-8 h-5 flex gap-[1px]">
      <div
        className="bg-black flex flex-1 items-center justify-center cursor-pointer rounded-sm"
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
      <div
        className="bg-black flex flex-1 items-center justify-center cursor-pointer rounded-sm"
        onClick={() => onClick(DIRECTION.DOWN)}
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
            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
          />
        </svg>
      </div>
    </div>
  );
}
