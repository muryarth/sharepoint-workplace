import * as React from "react";
import { useEffect, useState } from "react";
import { SPFI } from "@pnp/sp";
import type { IHelloWorldProps } from "./IHelloWorldProps";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjs-config";

const HelloWorld = (props: IHelloWorldProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  const LIST_NAME = "FAQ";
  let _sp: SPFI | null = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    console.log("context", _sp);

    if (_sp != null) {
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('letter', true).orderBy('Title', true)();

      console.log("FAQ Items", items);

      setFaqItems(
        items.map(({ Id, Title, body, letter }) => {
          return {
            Id: Id,
            Title: Title,
            body: body,
            letter: letter,
          };
        })
      );
    }
  };

  // Runs once, whenever the component is instanced
  useEffect(() => {
    getFAQItems();
  }, []);

  return (
    <>
      <h1>Hello World!</h1>
      <pre>{JSON.stringify(faqItems, null, 2)}</pre>
    </>
  );
};

export default HelloWorld;
