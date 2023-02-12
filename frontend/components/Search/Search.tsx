import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { styled } from "@/stitches.config";
import { Command } from "cmdk";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";

import { Search as SearchIcon } from "react-feather";
import logo from "@/assets/icon.png";
import Image from "next/image";

const fadeInOut = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.4,
    },
  },
};

export function Search({ articles }: any) {
  const [value, setValue] = useState("linear");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    inputRef?.current?.focus();
    async function getItems() {
      setLoading(true);
      const titles = [];
      for (const article of articles) {
        const res = await fetch("/api/metadata", {
          method: "POST",
          body: JSON.stringify({ url: article.original.link }),
        }).then((res) => res.json())
        if (res.success) {
          titles.push(res.payload);
        }
      }
      console.log(titles);
      setItems(titles);
      setLoading(false);
    }
    getItems();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div
          className="searchbar dark"
          style={
            {
              cursor: "pointer",
              "--padding-value": "18px",
            } as React.CSSProperties
          }
        >
          <Command>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Command.Input
                ref={inputRef}
                autoFocus
                placeholder="Search for articles, news, hotdogs, and bitcoin."
                disabled
                style={{ cursor: "pointer" }}
              />
              <SearchIcon style={{ position: "absolute", right: 25 }} />
            </div>
          </Command>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.44)",
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(10px)",
          }}
          className="normalContent"
        >
          <motion.div initial="hidden" animate="visible" variants={fadeInOut}>
            <Dialog.Content
              style={{
                width: "60vw",
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow:
                  "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
              }}
            >
              <div className="searchbar dark">
                <Command value={value} onValueChange={(v) => setValue(v)}>
                  <div cmdk-duality-top-shine="" />
                  <Command.Input
                    ref={inputRef}
                    autoFocus
                    placeholder="Search for articles, news, hotdogs, and bitcoin."
                  />
                  <hr cmdk-duality-loader="" />
                  <Command.List ref={listRef}>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Group heading="Suggestions">
                      {loading && (
                        <Command.Loading>Wait a min..</Command.Loading>
                      )}
                      {items.map((item: any) => (
                        <Item
                          key={item.ogUrl}
                          value={item.ogTitle}
                        >
                          <span>
                            <a href={item.ogUrl} target="_blank" style={{textDecoration: 'none', all: "unset"}}>{item.ogTitle}</a>
                          </span>
                        </Item>
                      ))}
                    </Command.Group>
                    <Command.Group heading="Commands">
                      <Item isCommand value="Clipboard History">
                        Delete History
                      </Item>
                    </Command.Group>
                  </Command.List>

                  <div
                    cmdk-duality-footer=""
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Image src={logo} alt="logo" width={20} height={20} />
                    <p
                      style={{
                        fontSize: ".7rem",
                        fontWeight: 900,
                        color: "#fff",
                        pointerEvents: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Duality
                    </p>
                  </div>
                </Command>
              </div>
            </Dialog.Content>
          </motion.div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Item({
  children,
  value,
  isCommand = false,
}: {
  children: React.ReactNode;
  value: string;
  isCommand?: boolean;
}) {
  return (
    <Command.Item value={value} onSelect={() => {}}>
      {children}
      <span cmdk-duality-meta="">{isCommand ? "Command" : ""}</span>
    </Command.Item>
  );
}

// function Search() {
//   const [loading, setLoading] = useState(false);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     async function getItems() {
//       setLoading(true);
//       const res = await fetch("https://dummyjson.com/users");
//       const data = await res.json();
//       setItems(data.users);
//       setLoading(false);
//     }
//     getItems();
//   }, []);

//   return (
//     <Popover.Root>
//     <Popover.Trigger>Toggle popover</Popover.Trigger>

//     <Popover.Content>
//     <Command className="duality">
//       <Command.Input />
//       <Command.List>
//         {loading && <Command.Loading>Fetching words…</Command.Loading>}
//         {items.map((item: any) => {
//           return (
//             <Command.Item key={`word-${item.id}`} value={item.firstName}>
//               {item.firstName} {item.lastName}
//             </Command.Item>
//           );
//         })}
//       </Command.List>
//     </Command>
//     </Popover.Content>
//   </Popover.Root>

//   );
// }

export default Search;
