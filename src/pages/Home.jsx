import React, { useCallback, useState } from "react";
import Header from "../components/Header";
import Leftside from "../components/Leftside";
import Main from "../components/Main";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = useCallback(() => {
    setShowModal((pre) => !pre);
  }, [showModal]);
  const openModal = useCallback(() => {
    setShowModal((pre) => !pre);
  }, [showModal]);
  return (
    <div>
      <Header showModal={showModal} openModal={openModal} />
      <div className="flex">
        <Leftside />
        <Main
          showModal={showModal}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default Home;
