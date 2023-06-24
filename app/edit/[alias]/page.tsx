"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import Countdown from "@/public/Components/Countdown";
import type { Database } from "@/types/supabase";
import Link from "next/link";
import LinkCardListItem from "@/public/Components/LinkCardListItem";
import LinkCardListItemEdit from "@/public/Components/LinkCardListItemEdit";
import Loader from "@/public/icons/Loader";
import { PostgrestError } from "@supabase/supabase-js";
import Spinner from "@/public/icons/Spinner";
import { StandardClasses } from "@/public/Utilities/Classes.enum";
import WeddingNotFound from "./WeddingNotFound";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type LinkCard = Database["public"]["Tables"]["LinkCards"]["Row"];
type WeddingInfo = Database["public"]["Tables"]["WeddingInfo"]["Row"];

export default function Home({ params }: { params: { alias: string } }) {
  const [linkCards, setLinkCards] = useState<LinkCard[] | null>(null);
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>();
  const [weddingNotFound, setWeddingNotFound] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const loadingSpinner = () => (
    <div className="flex w-full justify-center">
      <Spinner className="w-3" />
    </div>
  );

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      // get user
      const currentUser = supabase.auth.getUser();

      // get wedding
      const { data: weddingInfoResponse } = await supabase
        .from("WeddingInfo")
        .select()
        .eq("alias", params.alias)
        .is("deleted", false)
        .limit(1)
        .single();

      if (!weddingInfoResponse) {
        setWeddingNotFound(true);
        return;
      }

      currentUser
        .then((u) => {
          const user = u.data.user;
          if (!user) {
            setNoUser(true);
            return;
          }
          if (weddingInfoResponse.admin_id !== u.data.user.id) {
            setHasPermission(false);
            return;
          }
          setHasPermission(true);
        })
        .catch((e) => new Error(e));

      setWeddingInfo(weddingInfoResponse);

      // get cards
      const { data: cards } = await supabase
        .from("LinkCards")
        .select()
        .eq("wedding_fk", weddingInfoResponse.id)
        .is("deleted", false);

      setLinkCards(cards);
      setLoading(false);
    };

    getData();
  }, [supabase, params.alias]);

  function handleCardTitleChangeEvent(
    event: ChangeEvent<HTMLInputElement>,
    cardId: number
  ) {
    setLinkCards((prevCards) => {
      if (!prevCards) return [];
      return prevCards.map((card) =>
        card.id === cardId ? { ...card, title: event.target.value } : card
      );
    });
  }
  function handleCardSummaryChangeEvent(
    event: ChangeEvent<HTMLInputElement>,
    cardId: number
  ) {
    setLinkCards((prevCards) => {
      if (!prevCards) return [];
      return prevCards.map((card) =>
        card.id === cardId ? { ...card, summary: event.target.value } : card
      );
    });
  }
  function handleCardLinkChangeEvent(
    event: ChangeEvent<HTMLInputElement>,
    cardId: number
  ) {
    setLinkCards((prevCards) => {
      if (!prevCards) return [];
      return prevCards.map((card) =>
        card.id === cardId ? { ...card, link: event.target.value } : card
      );
    });
  }
  function updateStatusToast(
    weddingInfoError: PostgrestError | null,
    linkCardError: PostgrestError | null,
    weddingData: WeddingInfo[] | null,
    linkCardData: LinkCard[] | null
  ): void {
    if (weddingInfoError && linkCardError)
      toast.error("Failed to save anything.");
    if (weddingInfoError && linkCardData) {
      toast.success("Succesfully saved Link Cards!");
      toast.error(
        `Failed to save Wedding Info. Code: ${weddingInfoError.code}`
      );
      setLinkCards(linkCardData);
    }
    if (linkCardError && weddingData) {
      toast.success("Succesfully saved Link Cards!");
      toast.error(`Failed to save Link Cards. Code: ${linkCardError.code}`);
      setWeddingInfo(weddingData[0]);
    }
    if (weddingData && linkCardData)
      toast.success("Saved everything successfully!");
    setIsSaving(false);
  }
  async function submit() {
    setIsSaving(true);
    if (!weddingInfo || !linkCards) {
      toast.error("There seems to be nothing to save...");
      return;
    }
    const { data: weddingInfoData, error: weddingInfoError } = await supabase
      .from("WeddingInfo")
      .update(weddingInfo)
      .eq("id", weddingInfo.id)
      .select();
    const { data: linkCardData, error: linkCardError } = await supabase
      .from("LinkCards")
      .upsert(linkCards)
      .select();

    updateStatusToast(
      weddingInfoError,
      linkCardError,
      weddingInfoData,
      linkCardData
    );
  }
  return (
    <>
      <Toaster />
      <main className="flex-grow mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
        {!loading && noUser && <p>Please login to edit.</p>}
        {!loading && !noUser && !hasPermission && (
          <p>You can only edit your own wedding.</p>
        )}
        {!loading && !noUser && hasPermission && weddingInfo && (
          <>
            <div className="flex justify-between mb-7">
              <h1 className="w-full text-2xl">Editing: {weddingInfo.title}</h1>
              <button
                type="button"
                className={StandardClasses.buttonPrimary}
                onClick={submit}
                disabled={isSaving}
              >
                {isSaving ? <Loader /> : "Save"}
              </button>
            </div>

            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className={`${StandardClasses.inputPrimary} mr-2`}
              value={weddingInfo.title || ""}
              onChange={({ currentTarget }) =>
                setWeddingInfo({
                  ...weddingInfo,
                  title: currentTarget.value,
                })
              }
              disabled={isSaving}
            />

            <label className="sr-only" htmlFor="date">
              Wedding Date:{" "}
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className={StandardClasses.inputPrimary}
              value={weddingInfo.date || ""}
              onChange={({ currentTarget }) =>
                setWeddingInfo({
                  ...weddingInfo,
                  date: currentTarget.value,
                })
              }
              disabled={isSaving}
            />

            <label className="sr-only" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full h-52 pt-8 pb-3 px-6 mt-2 border-2 border-zinc-300 dark:border-zinc-700 bg-transparent rounded-md shadow-sm"
              value={weddingInfo.description || ""}
              onChange={(e) =>
                setWeddingInfo({
                  ...weddingInfo,
                  description: e.currentTarget.value,
                })
              }
              disabled={isSaving}
            />

            {linkCards ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
                <div className="space-y-2">
                  <h2 className="font-light text-lg pl-2 text-zinc-600 dark:text-zinc-500">
                    Wedding Info
                  </h2>
                  <ul className="space-y-2">
                    {linkCards.map((linkCard, i) => {
                      if (linkCard.column !== 1) return;
                      if (linkCard.isNavCard) {
                        return (
                          <li
                            className="p-2 pb-1 dark:bg-zinc-700 bg-zinc-300 rounded flex flex-col"
                            key={linkCard.id}
                          >
                            <input
                              type="text"
                              className={`${StandardClasses.inputPrimary} w-full`}
                              value={linkCard.title || ""}
                              onChange={(e) =>
                                handleCardTitleChangeEvent(e, linkCard.id)
                              }
                              disabled={isSaving}
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              className={`${StandardClasses.inputPrimary} text-xs w-full`}
                              value={linkCard.summary || ""}
                              onChange={(e) =>
                                handleCardSummaryChangeEvent(e, linkCard.id)
                              }
                              disabled={isSaving}
                              placeholder="Summary"
                            />
                            <input
                              type="text"
                              className={`${StandardClasses.inputPrimary} text-xs w-full`}
                              value={weddingInfo.addressOne || ""}
                              onChange={(e) =>
                                setWeddingInfo({
                                  ...weddingInfo,
                                  addressOne: e.currentTarget.value,
                                })
                              }
                              disabled={isSaving}
                              placeholder="Wedding Address"
                            />
                          </li>
                        );
                      }
                      return (
                        <LinkCardListItemEdit
                          key={linkCard.id}
                          linkCard={linkCard}
                          isSaving={isSaving}
                          changeTitleHandler={handleCardTitleChangeEvent}
                          changeSummaryHandler={handleCardSummaryChangeEvent}
                          changeLinkHandler={handleCardLinkChangeEvent}
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
                        <LinkCardListItemEdit
                          key={linkCard.id}
                          linkCard={linkCard}
                          isSaving={isSaving}
                          changeTitleHandler={handleCardTitleChangeEvent}
                          changeSummaryHandler={handleCardSummaryChangeEvent}
                          changeLinkHandler={handleCardLinkChangeEvent}
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
                        <LinkCardListItemEdit
                          key={linkCard.id}
                          linkCard={linkCard}
                          isSaving={isSaving}
                          changeTitleHandler={handleCardTitleChangeEvent}
                          changeSummaryHandler={handleCardSummaryChangeEvent}
                          changeLinkHandler={handleCardLinkChangeEvent}
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
      <footer className="flex justify-center border-t border-zinc-700 w-full text-center p-4 text-zinc-500 dark:text-zinc-500 text-sm md:text-base">
        <p>
          made with ♥ by{" "}
          <Link
            className="hover:underline"
            href="https://twadd.dev"
            target="_blank"
          >
            twadd
          </Link>
        </p>
        {!loading && weddingInfo && weddingInfo.date && (
          <>
            <span className="px-5">|</span>
            <Countdown targetDate={weddingInfo.date} />
          </>
        )}
      </footer>
    </>
  );
}
