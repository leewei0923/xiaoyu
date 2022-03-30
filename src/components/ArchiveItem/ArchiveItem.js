import styles from "./archiveItem.module.scss";
import Link from "next/link";

export default function ArchiveItem(props) {
  const { year, child } = props.info;

  // 按照时间排序 最新排在最前面
  child.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className={styles.container}>
      <ul>
        <h3 className={styles.title}>{year}</h3>

        {child.map((item) => {
          const { slug, date, name, tags, type } = item;

          return (
            <li key={slug + "archiveItem"}>
              <Link href={`/articles/${slug}` ?? "/"}>
                <a>
                  <em>{date}</em>
                  <span>{name}</span>
                </a>
              </Link>

              <div className={styles.tags}>
                {tags instanceof Array ? (
                  tags.map((item) => (
                    <p className={styles.tag} key={item + "tag"}>
                      {item}
                    </p>
                  ))
                ) : (
                  <p className={styles.tag}>{tags}</p>
                )}

                <p className={styles.type}>
                  {type == "life" ? "生活随笔" : "技术"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
