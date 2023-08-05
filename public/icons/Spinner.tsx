import "./spinner.css";

interface Props {
  className?: string;
}

export default function Spinner({ className }: Props) {
  return (
    <svg
      className={`w-10 h-10 animate-spin stroke-zinc-900 dark:stroke-zinc-200  cls-1 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16.73 25"
    >
      <g>
        <path
          className="cls-1"
          d="m13.73,17.78c2.96-2.96,2.96-7.77,0-10.73s-7.77-2.96-10.73,0S.03,14.82,3,17.78c1.46,1.46,3.37,2.2,5.29,2.22"
        />
        <polyline
          className="cls-2"
          points="7.28 3.66 8.48 4.66 11.07 2.3 10.3 .75 6.43 .75 5.65 2.3 7.28 3.66"
        />
      </g>
    </svg>
  );
}
