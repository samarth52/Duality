import styles from "./TagSearch.module.css";
import searchIcon from "../../assets/search_icon.png";
import closeBubble from "../../assets/close_bubble.png";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TagSearch({
  selectedTags,
  setSelectedTags,
  allTags,
}: any) {
  const [input, setInput] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    if (allTags) {
      const temp = allTags.filter((tag: any) =>
        tag.toLowerCase().startsWith(input.toLowerCase())
      );
      if (input !== "") {
        setSuggestedUsers(temp);
      } else {
        setSuggestedUsers([]);
      }
    }
  }, [input]);

  return (
    <div className={styles.search_container}>
      <div className={styles.SearchBar}>
        <div className={styles.search_input_container}>
          <Image src={searchIcon} alt="search icon"></Image>
          <input
            placeholder="Search for topics"
            className={styles.search_bar_input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </div>
        <div className={styles.suggested_users_list}>
          {suggestedUsers.map((u) => {
            return !selectedTags.includes(u) ? (
              <div
                className={styles.suggested_list_row}
                key={u}
                onClick={() => {
                  const temp = selectedTags;
                  temp.push(u);
                  setSelectedTags([...temp]);
                }}
              >
                {u}
              </div>
            ) : null;
          })}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className={styles.InvitedContainer}>
          {selectedTags.map((i_u: any) => {
            return (
              <div className={styles.invited_bubble} key={i_u}>
                <div className={styles.bubble_name}>{i_u}</div>
                <Image
                  src={closeBubble}
                  alt="close bubble"
                  className={styles.bubble_close_button}
                  onClick={() => {
                    const temp = selectedTags;
                    temp.splice(temp.indexOf(i_u), 1);
                    setSelectedTags([...temp]);
                  }}
                ></Image>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
