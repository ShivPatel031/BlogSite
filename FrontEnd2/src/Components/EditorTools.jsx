import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
// import CodeTool from "@editorjs/code";
import Header from "@editorjs/header";

export const tools = {
  embed: Embed,
  list: { class: List, inlineToolbar: true },
  link: Link,
  header: {
    class: Header,
    config: {
      Placeholder: "Type Heading...",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
  },
  quote: { class: Quote, inlineToolbar: true },
  marker: Marker,
  inlineCode: InlineCode,
  image: SimpleImage,
};
