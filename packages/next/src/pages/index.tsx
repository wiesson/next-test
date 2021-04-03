import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import path from "path";

export default function Home({ locale, filenames, translations = [] }) {
  return (
    <div>
      <h1>{locale}</h1>
      <ul>
        {filenames.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <pre>{JSON.stringify(translations, null, 2)}</pre>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context, ...rest) => {
  const { locale = "de" } = context;

  const dataDirectory = path.join(process.cwd(), "data");
  const filenames = await fs.readdir(dataDirectory);

  const translations = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), `data/${locale}/cantons.json`),
      "utf8"
    )
  );

  return {
    props: {
      locale,
      filenames,
      translations,
    },
    revalidate: 1,
  };
};
