import * as React from "react";
import { useEffect, useState } from "react";
import { SPFI } from "@pnp/sp";
import type { IHelloWorldProps } from "./IHelloWorldProps";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjs-config";
import { Accordion } from "@pnp/spfx-controls-react";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

const HelloWorld = (props: IHelloWorldProps) => {
  // const LOG_SOURCE = "FAQ Webpart";
  // const LIST_NAME = "FAQ";
  let _sp: SPFI | null = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    console.log("context", _sp);

    if (_sp != null) {
      console.log(props.listGuid);

      const items = await _sp.web.lists
        .getById(props.listGuid)
        .items.select()
        .orderBy("letter", true)
        .orderBy("Title", true)();

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
    if (props.listGuid && props.listGuid != "") {
      getFAQItems();
    }
  }, [props]);

  return (
    <>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      {props.listGuid ? (
        faqItems.map((object: IFAQ, index: number) => {
          return (
            <Accordion key={index} title={object.Title} defaultCollapsed={true}>
              {object.body}
            </Accordion>
          );
        })
      ) : (
        <Placeholder
          iconName="Edit"
          iconText="Configure your web part"
          description="Please configure the web part."
          buttonLabel="Configure"
          onConfigure={() => props.context.propertyPane.open()}
        />
        // <h1>Porfavor, selecione uma lista</h1>
      )}
    </>
  );
};

export default HelloWorld;
