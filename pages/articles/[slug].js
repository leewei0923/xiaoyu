import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Layout from "../../src/components/Layout/Layout";

export default function PostPage({
  frontmatter: { title, date, img},
  slug,
  content,
}) {
  return (
    <Layout>
      <p>{title}</p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("articles"));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  // console.log("paths",paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("articles", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // console.log("slug:", slug);
  // console.log("fo:", frontmatter);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
