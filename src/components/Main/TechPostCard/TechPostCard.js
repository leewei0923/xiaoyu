import styles from "./techPostCard.module.scss";
import Link from "next/link";
import { timeFormatte } from "~/src/utils/timeFormatte";
import { useRouter } from "next/router";

export default function TechPostCard(props) {
  const { post, type, desc } = props;
  const {
    frontmatter: { date, title, tags, description },
    slug,
  } = post;
  const router = useRouter();

  // 点击跳转链接
  const jumpLink = (slug) => {
    router.push(slug)
  };

  return (
    <>
      <div className={styles.techCard}>
        <p
          className={styles.title}
          onClick={() => jumpLink(`/articles/${slug}`)}
        >
          {title ?? "默认标题"}
        </p>
        <p
          className={styles.summary}
          onClick={() => jumpLink(`/articles/${slug}`)}
        >
          {desc.join("") ?? ""}
        </p>
        <div className={styles.Links}>
          <Link href={`/articles/${slug}`}>
          <a>阅读更多</a>
        </Link>
        </div>
        

        {/* 时间, 标签 */}
        <div className={styles.mixBox}>
          <div className={styles.date}>
            {timeFormatte(date, "yy-mm-dd") ?? "2022-01-02"}
          </div>

          <div className={styles.tags}>
            {tags.map((item) => {
              return <span key={item}>{item}</span>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
