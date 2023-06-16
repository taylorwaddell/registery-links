"use client";

import { useEffect, useState } from "react";

import AddressToDirectionsLink from "@/public/Utilities/AddressToDirectionsLink";
import type { Database } from "@/types/supabase";
import ExternalLink from "@/public/icons/ExternalLink";
import LinkCardListItem from "@/public/Components/LinkCardListItem";
import Modal from "@/public/Components/Modal";
import Spinner from "@/public/icons/Spinner";
import StringToParagraphs from "@/public/Utilities/StringToParagraphs";
import WeddingNotFound from "./WeddingNotFound";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type LinkCard = Database["public"]["Tables"]["LinkCards"]["Row"];
type WeddingInfo = Database["public"]["Tables"]["WeddingInfo"]["Row"];

export default function Home({ params }: { params: { alias: string } }) {
  const [linkCards, setLinkCards] = useState<LinkCard[] | null>(null);
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>();
  const [weddingNotFound, setWeddingNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const loadingSpinner = () => (
    <div className="flex w-full justify-center">
      <Spinner />
    </div>
  );

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data: weddingInfoResponse } = await supabase
        .from("WeddingInfo")
        .select()
        .eq("alias", params.alias)
        .is("deleted", false)
        .limit(1)
        .single();

      if (!weddingInfoResponse) {
        setWeddingNotFound(true);
        setLoading(false);
        return;
      }

      setWeddingInfo(weddingInfoResponse);

      const { data: cards } = await supabase
        .from("LinkCards")
        .select()
        .eq("weddingFK", weddingInfoResponse.id)
        .is("deleted", false);

      setLinkCards(cards);
      setLoading(false);
    };

    getData();
  }, [supabase, params.alias]);

  function closeModal() {
    setModalIsOpen(false);
  }
  function openModal() {
    setModalIsOpen(true);
  }
  return (
    <main className="flex-grow mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
      {!loading && weddingInfo && (
        <>
          {weddingInfo.addressOne && (
            <Modal
              isOpen={modalIsOpen}
              title="Which map app do you use?"
              content="Choose wisely..."
              cancelText=" Apple Maps"
              confirmText="Google Maps"
              googleLink={
                AddressToDirectionsLink(weddingInfo.addressOne).google
              }
              appleLink={AddressToDirectionsLink(weddingInfo.addressOne).apple}
              close={closeModal}
            />
          )}
          <h1 className="w-full text-center text-2xl">{weddingInfo.title}</h1>
          {weddingInfo.description ? (
            <div className="pt-8 pb-3 px-6 border-2 border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm my-10">
              {StringToParagraphs(weddingInfo.description)}
            </div>
          ) : (
            <></>
          )}

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
            loadingSpinner()
          )}
        </>
      )}
      {loading && loadingSpinner()}
      {weddingNotFound && !loading && WeddingNotFound()}
    </main>
  );
}
