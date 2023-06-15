"use client";

import ExternalLink from "../icons/ExternalLink";
import Link from "next/link";

interface Props {
  link: string | null;
  title: string | null;
  summary: string | null;
}

export default function LinkCardListItem({ title, link, summary }: Props) {
  return (
    <li className="p-2">
      <Link
        href={link ? link : '#'}
        className="flex font-semibold hover:underline"
        target="_blank"
      >
        {title}
        <ExternalLink className={"ml-1"} />
      </Link>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">{summary}</p>
    </li>
  );
}
