import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Header from "../header/header";
import styles from "./favorites.module.css";
import PoemItem from "../poem/poem_item";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Favorites = inject((stores) => stores)(
  observer(({ store }) => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      setFavorites(store.getFavorites());
    }, []);

    const backButton = (
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack sx={{ color: "white" }} />
      </IconButton>
    );

    return (
      <div>
        <Header title="favorites" leftItem={backButton} />
        <div className={styles.FavoritesSection}>
          {favorites.length <= 0 ? (
            <p className={`Text ${styles.NoFavorites}`}>No favorites yet</p>
          ) : (
            favorites.map((poem) => (
              <PoemItem key={Math.random(9999)} poem={poem} />
            ))
          )}
        </div>
      </div>
    );
  })
);

export default Favorites;
