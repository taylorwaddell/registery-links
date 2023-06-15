"use client";

import { useEffect, useState } from "react";

import AddressToDirectionsLink from "@/public/Utilities/AddressToDirectionsLink";
import type { Database } from "@/types/supabase";
import ExternalLink from "@/public/icons/ExternalLink";
import LinkCardListItem from "@/public/Components/LinkCardListItem";
import Modal from "@/public/Components/Modal";
import Spinner from "@/public/icons/Spinner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type LinkCard = Database["public"]["Tables"]["LinkCards"]["Row"];

export default function Home() {
  const [linkCards, setLinkCards] = useState<LinkCard[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("LinkCards")
        .select()
        .is("deleted", false);
      console.log(data);
      setLinkCards(data);
    };

    getData();
  }, [supabase]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  function closeModal() {
    setModalIsOpen(false);
  }
  function openModal() {
    setModalIsOpen(true);
  }
  return (
    <main className="flex-grow mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
      <Modal
        isOpen={modalIsOpen}
        title="Which map app do you use?"
        content="Choose wisely..."
        cancelText=" Apple Maps"
        confirmText="Google Maps"
        googleLink={
          AddressToDirectionsLink("100 lafayette st baton rouge la 70801")
            .google
        }
        appleLink={
          AddressToDirectionsLink("100 lafayette st baton rouge la 70801").apple
        }
        close={closeModal}
      />
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

      {linkCards ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          <div className="space-y-2">
            <h2 className="font-light text-lg pl-2 text-zinc-600 dark:text-zinc-500">
              Wedding Info
            </h2>
            <ul className="space-y-2">
              {linkCards.map((linkCard) => {
                if (linkCard.column !== 1) return;
                if (linkCard.isNavCard) {
                  return (
                    <li className="p-2" key={linkCard.id}>
                      <p
                        className="cursor-pointer	flex font-semibold hover:underline"
                        onClick={openModal}
                        onKeyUp={(e) => e.key === "Enter" && openModal()}
                        tabIndex={1}
                      >
                        {linkCard.title}
                        <ExternalLink className={"ml-1"} />
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        {linkCard.summary}
                      </p>
                    </li>
                  );
                }
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
      ) : (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      )}
    </main>
  );
}
