import React from "react";
import Feed from "./Feed";
import Rightside from "./Rightside";

const Main = ({ showModal, closeModal, openModal }) => {
  return (
    <main className="w-5/6 mt-8 ml-auto pt-20">
      <section className="w-[96%] ml-[3%] mr-[1%]">
        <article className="flex gap-x-6 items-start">
          <Feed
            showModal={showModal}
            closeModal={closeModal}
            openModal={openModal}
          />
          <Rightside />
        </article>
      </section>
    </main>
  );
};

export default Main;
