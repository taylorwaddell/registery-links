"use client";

import { ChangeEvent } from "react";
import { Database } from "@/types/supabase";
import { StandardClasses } from "@/public/Utilities/Classes.enum";

type LinkCard = Database["public"]["Tables"]["LinkCards"]["Row"];

interface Props {
  linkCard: LinkCard;
  isSaving: boolean;
  changeTitleHandler: (
    e: ChangeEvent<HTMLInputElement>,
    cardId: number
  ) => void;
  changeSummaryHandler: (
    e: ChangeEvent<HTMLInputElement>,
    cardId: number
  ) => void;
  changeLinkHandler: (e: ChangeEvent<HTMLInputElement>, cardId: number) => void;
}

export default function LinkCardListItem({
  linkCard,
  isSaving,
  changeTitleHandler,
  changeSummaryHandler,
  changeLinkHandler,
}: Props) {
  return (
    <li className="p-2 pb-1 dark:bg-zinc-700 bg-zinc-300 rounded flex flex-col">
      <label className="sr-only" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        className={`${StandardClasses.inputPrimary}`}
        value={linkCard.title || ""}
        onChange={(e) => changeTitleHandler(e, linkCard.id)}
        disabled={isSaving}
        placeholder="Title"
      />
      <label className="sr-only" htmlFor="summary">
        Summary
      </label>
      <input
        type="text"
        className={`${StandardClasses.inputPrimary} text-xs`}
        value={linkCard.summary || ""}
        onChange={(e) => changeSummaryHandler(e, linkCard.id)}
        disabled={isSaving}
        placeholder="Summary"
      />
      <label className="sr-only" htmlFor="link">
        Link
      </label>
      <input
        type="text"
        className={`${StandardClasses.inputPrimary} text-xs`}
        value={linkCard.link || ""}
        onChange={(e) => changeLinkHandler(e, linkCard.id)}
        disabled={isSaving}
        placeholder="Link"
      />
    </li>
  );
}
