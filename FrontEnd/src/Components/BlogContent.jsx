function Img({ url, caption }) {
  return (
    <div>
      <img src={url} />
      {caption && caption.length && (
        <p className="w-full text-center my-3 md:mb-12 text-base">{caption}</p>
      )}
    </div>
  );
}

function Quote({ quote, caption }) {
  return (
    <div className="p-3 pl-5 border-l-4 border-purple-500 bg-purple-100">
      <p className="text-xl leading-10 md:text-2xl">{quote}</p>
      {caption && caption.length && (
        <p className="w-full text-purple-400 text-base">{caption}</p>
      )}
    </div>
  );
}

function List({ style, items }) {
    console.log(items)
  return (
    <ol
      className={`pl-5  ${style == "ordered" ? "list-decimal" : "list-disc"}`}
    >
      {items.map((litsItems, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: litsItems.content }}></li>
      ))}
    </ol>
  );
}
export function BlogContent({ block }) {
  let { type, data } = block;

  if (type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }

  if (type == "header") {
    if (data.level == 3) {
      return (
        <h3
          className="text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h3>
      );
    }
    if (data.level == 2) {
      return (
        <h2
          className="text-4xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h2>
      );
    }
  }

  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }

  if (type == "qute") {
    return <Quote quote={data.text} caption={data.caption} />;
  }

  if (type == "list") {
    return <List style={data.style} items={data.items} />;
  }
}
