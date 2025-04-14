import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function SwitchChapters({
  chapter,
  onClickBack,
  onClickNext,
  chapterLength,
}) {
  return (
    <div className="grid grid-cols-3 items-center">
      <button
        type="button"
        onClick={onClickBack}
        disabled={Number(chapter.order) === 1}
        className="flex items-center text-secondary-brand disabled:text-secondary-brand/70"
      >
        <IconChevronLeft stroke={1.25} size={40} color="currentColor" />
        <p className="text-sm font-script">
          {chapter.order > 1 ? `Chapter ${chapter.order - 1}` : ""}
        </p>
      </button>
      <div className="text-xl text-center font-script-semibold text-secondary-brand">
        <h2>Chapter {chapter.order}</h2>
      </div>
      <button
        type="button"
        onClick={onClickNext}
        disabled={Number(chapter.order) === chapterLength}
        className="flex items-center justify-end text-secondary-brand disabled:text-secondary-brand/70"
      >
        <p className="text-sm font-script">
          {Number(chapter.order) !== chapterLength
            ? `Chapter ${chapter.order + 1}`
            : ""}
        </p>
        <IconChevronRight stroke={1.25} size={40} color="currentColor" />
      </button>
    </div>
  );
}
