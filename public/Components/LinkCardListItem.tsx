"use client";

import ExternalLink from "../icons/ExternalLink";
import Link from "next/link";
import { StandardClasses } from "../Utilities/Classes.enum";

interface Props {
  link: string | null;
  title: string | null;
  summary: string | null;
  disabled: boolean;
}

export default function LinkCardListItem({
  title,
  link,
  summary,
  disabled,
}: Props) {
  return (
    <li className="p-2">
      <Link
        href={link ? link : "#"}
        className={
          StandardClasses.link + (disabled ? StandardClasses.linkDisabled : "")
        }
        target="_blank"
      >
        {title}
        <ExternalLink className={"ml-1"} />
      </Link>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">{summary}</p>
    </li>
  );
}
