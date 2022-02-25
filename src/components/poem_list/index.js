import { inject, observer } from "mobx-react";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./poem_list.module.css";
import Header from "../header/header";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import PoemItem from "../poem/poem_item";
import { useNavigate } from "react-router";

const PoemList = inject((stores) => stores)(
  observer(({ store }) => {
    const navigate = useNavigate();

    const favoritesButton = (
      <IconButton onClick={() => navigate("/favorites")}>
        <Star sx={{ color: "yellow" }} />
      </IconButton>
    );

    return (
      <div className={styles.PoemListSection}>
        <Header title="Bejoynd Poems" rightItem={favoritesButton} />
        {store.poemList.length <= 0 ? (
          <button className={styles.GetButton} onClick={() => store.getPoems()}>
            Get poems
          </button>
        ) : null}
        {store.loading ? (
          <div className={styles.Loading}>
            <CircularProgress size={70} />
          </div>
        ) : null}
        <div className={styles.List}>
          {store.poemList.length > 0 ? (
            <FormControl fullWidth className={styles.Sort}>
              <InputLabel id="sort-select-label">Sort by</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={store.sortValue}
                label="Sort by"
                onChange={store.handleSortChange}
              >
                <MenuItem value={"title"}>Title</MenuItem>
                <MenuItem value={"author"}>Author</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          {store.poemList.map((poem) => (
            <PoemItem key={Math.random(9999)} poem={poem} />
          ))}
        </div>
      </div>
    );
  })
);

export default PoemList;
