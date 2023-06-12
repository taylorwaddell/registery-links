import LinkCardListItem from "@/public/Components/LinkCardListItem";

interface LinkCards {
  id: number;
  column: number;
  link: string;
  title: string;
  summary: string;
}

export default function Home() {
  const linkCards: LinkCards[] = [
    {
      id: 1,
      column: 1,
      link: "https://www.google.com/maps/dir//Shaw+Center+for+the+Arts,+100+Lafayette+St,+Baton+Rouge,+LA+70801/@30.4479022,-91.1915779,17z/data=!3m1!5s0x8626a0c14b427007:0x2626a4a9e03c0a6!4m9!4m8!1m0!1m5!1m1!1s0x8626a0c6b6401ad5:0x14a34040c17b1959!2m2!1d-91.189003!2d30.4478976!3e0?entry=ttu",
      title: "Directions to Reception",
      summary: "Remember your dance shoes.",
    },
    {
      id: 2,
      column: 1,
      link: "https://www.taylorwaddell.com",
      title: "Photo Gallery",
      summary: "Come back later to see our wedding pictures.",
    },
    {
      id: 3,
      column: 1,
      link: "https://www.google.com",
      title: "Google",
      summary: "Learn somethin'.",
    },
    {
      id: 4,
      column: 2,
      link: "#",
      title: "Cash Fund",
      summary: "Honey moon and other fun things",
    },
    {
      id: 5,
      column: 2,
      link: "#",
      title: "Amazon",
      summary: "A short description. Maybe even a longer one. I don't care.",
    },
    {
      id: 6,
      column: 2,
      link: "#",
      title: "Target",
      summary: "A short description.",
    },
    {
      id: 7,
      column: 3,
      link: "#",
      title: "RSVP: Reception",
      summary: "Let's party 🎉",
    },
  ];

  return (
    <main className="mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
      <h1 className="w-full text-center text-2xl">T A L Y</h1>
      <div className="py-8 px-6 border-2 border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm my-10">
        <p className="mb-5">
          Welcome to our wedding information website, where love and celebration
          come together! We are thrilled to have you join us on this joyous
          occasion and extend our warmest welcome to all our guests.
        </p>
        <p>
          Here, you will find a treasure trove of details about our upcoming
          wedding, ensuring that you have all the information you need to fully
          enjoy and participate in this memorable event.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
        <div className="space-y-2">
          <h2 className="font-light text-lg pl-2 text-zinc-600 dark:text-zinc-500">
            Wedding Info
          </h2>
          <ul className="space-y-2">
            {linkCards.map((linkCard) => {
              if (linkCard.column !== 1) return;
              return (
                <LinkCardListItem
                  key={linkCard.id}
                  title={linkCard.title}
                  link={linkCard.link}
                  summary={linkCard.summary}
                />
              );
            })}
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="font-light text-lg pl-2 text-zinc-600 dark:text-zinc-500">
            Registries
          </h2>
          <ul className="space-y-2">
            {linkCards.map((linkCard) => {
              if (linkCard.column !== 2) return;
              return (
                <LinkCardListItem
                  key={linkCard.id}
                  title={linkCard.title}
                  link={linkCard.link}
                  summary={linkCard.summary}
                />
              );
            })}
          </ul>
        </div>
        <div className="space-y-2">
          <h2 className="font-light text-lg pl-2 text-zinc-600 dark:text-zinc-500">
            Misc
          </h2>
          <ul className="space-y-2">
            {linkCards.map((linkCard) => {
              if (linkCard.column !== 3) return;
              return (
                <LinkCardListItem
                  key={linkCard.id}
                  title={linkCard.title}
                  link={linkCard.link}
                  summary={linkCard.summary}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
