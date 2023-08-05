export default function StringToParagraphs(inputString: string) {
  const paragraphs = inputString.split("<br />");

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-5">{paragraph}</p>
      ))}
    </>
  );
}
