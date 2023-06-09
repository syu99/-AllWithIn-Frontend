import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  let connection;
  let pathCreate;
  let pathJoin;

  if (user.token) {
    pathCreate = "/createProject";
    pathJoin = "/join";
  } else {
    pathCreate = "/signIn";
    pathJoin = "/signIn";
  }
  return (
    <div className={styles.homeContainer}>
      {/* backgroundTop start*/}
      <div className={styles.backgroundTop}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>AllWithin</span>
        </h1>
        <h2 className={styles.subtitle}>Where projects come to life</h2>
        <div className={styles.lineContainer}>
          <div className={styles.square}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.containerCards}>
          <div className={styles.leftCard}>
            <span className={styles.txtLeftCard}>
              Create your own project and costumize your staff
            </span>
            <Link href={pathCreate}>
              <button className={styles.btnLeft}>Create Project</button>
            </Link>
          </div>
          <div className={styles.rightCard}>
            <span className={styles.txtRightCard}>
              Join a project with a tailor-made team
            </span>
            <Link href={pathJoin}>
              <button className={styles.btnRight}>Join Project</button>
            </Link>
          </div>
        </div>
      </div>
      {/* backgroundTop end*/}
    </div>
  );
}

export default Home;
