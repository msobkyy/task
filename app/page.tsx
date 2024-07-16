"use client";
import type { FC } from "react";
import React, { useCallback, useState } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { CopyBlock } from "react-code-blocks";
import ChangeHighlight from "react-change-highlight";

const style = {
  width: 400,
};
interface Item {
  id: number;
  text: string;
}
interface ContainerState {
  cards: Item[];
}
export default function Home() {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "one",
    },
    {
      id: 2,
      text: "two",
    },
    {
      id: 3,
      text: "three",
    },
    {
      id: 4,
      text: "Four",
    },
    {
      id: 5,
      text: "Five",
    },
    {
      id: 6,
      text: "six",
    },
    {
      id: 7,
      text: "seven",
    },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      );
    },
    []
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-24 bg-white text-black">
      <h1 className="text-2xl font-bold">Mohamed Elsobky</h1>
      <h2 className="text-xl font-semibold">Frontend task</h2>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-10  bg-white text-black mt-10">
        <div>
          <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </div>

        <CopyBlock
          text={JSON.stringify(
            cards
              .map((card, i) => {
                return { id: card.id, order: i + 1 };
              })
              .sort((a, b) => a.id - b.id),
            null,
            2
          )}
          language={"javascript"}
        />
      </div>
    </main>
  );
}
