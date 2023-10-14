import * as React from "react";
import { useEffect } from "react";
import { SPFI } from "@pnp/sp";
import type { IHelloWorldProps } from "./IHelloWorldProps";
// import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjs-config";

const HelloWorld = (props: IHelloWorldProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  const LIST_NAME = "FAQ";
  let _sp: SPFI | null = getSP(props.context);

  // const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    console.log("context", _sp);

    if (_sp != null) {
      const items = _sp.web.lists.getByTitle(LIST_NAME).items();

      console.log(items);
    }
  };

  // run once
  useEffect(() => {
    getFAQItems();
  });

  return <h1>Hello World!</h1>;
};

export default HelloWorld;
