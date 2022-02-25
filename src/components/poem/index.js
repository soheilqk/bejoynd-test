import { ArrowBack, Star, StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import styles from "./poem.module.css";
import { useNavigate } from "react-router-dom";

const Poem = inject((stores) => stores)(
  observer(({ store }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
      setIsFav(store.favorites.includes(params.poemTitle));
    }, []);

    const toggleFav = () => {
      if (isFav) {
        setIsFav(false);
        store.removeFromFavorites(params.poemTitle);
      } else {
        setIsFav(true);
        store.addToFavorites(params.poemTitle);
      }
    };

    const backButton = (
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack sx={{ color: "white" }} />
      </IconButton>
    );

    const favButton = (
      <IconButton onClick={() => toggleFav()}>
        {isFav ? (
          <Star sx={{ color: "yellow" }} />
        ) : (
          <StarBorder sx={{ color: "white" }} />
        )}
      </IconButton>
    );
    return (
      <div>
        <Header
          title={params.poemTitle}
          subTitle={store.selectedPoem.author}
          leftItem={backButton}
          rightItem={favButton}
        />
        <div className={styles.PoemSection}>
          {store.selectedPoem?.lines?.map((line) => (
            <p key={Math.random(9999)} className={`${styles.Line} Text`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  })
);

export default Poem;
