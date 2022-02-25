import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./poem.module.css";

const PoemItem = inject((stores) => stores)(
  observer(({ store, poem }) => {
    return (
      <Link to={`/${poem.title}`} onClick={() => store.setSelectedPoem(poem)}>
        <div className={styles.PoemBox}>
          <p className="Text">{poem.title}</p>
          <p className="Text">
            <span className={styles.By}>By</span>
            {poem.author}
          </p>
        </div>
      </Link>
    );
  })
);

export default PoemItem;
