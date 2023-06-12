import ExternalLink from "../icons/ExternalLink";

interface Props {
  link: string;
  title: string;
  summary: string;
}

export default function LinkCardListItem({ title, link, summary }: Props) {
  return (
    <li className="p-2">
      <a href={link} className="flex font-semibold hover:underline">
        {title}
        <ExternalLink className={"w-5 h-5 ml-1"} />
      </a>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">{summary}</p>
    </li>
  );
}
