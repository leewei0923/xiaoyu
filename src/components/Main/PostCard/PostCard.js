import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import styles from "./postCard.module.scss";
import bg from "../../../../public/images/header-bg.jpg";
import { timeFormatte } from "~/src/utils/timeFormatte";

export default function PostCard({ post, index, type }) {
  const {
    frontmatter: { date, description, tags, title, img },
    slug,
  } = post;

  const postImage = classnames({
    [styles.postImage]: true,
    [styles.toRight]: index % 2 != 0,
  });

  const postText = classnames({
    [styles.postText]: true,
    [styles.toLeft]: index % 2 != 0,
  });

  return (
    <>
      <div className={styles.articles} key={title}>
        {/* 封面图 */}
        <div className={postImage}>
          <Link href={`/articles/${slug}`}>
            <a>
              <Image
                src={img ? img : bg.src}
                alt={title}
                width={860}
                height={580}
                // layout="responsive"
                // objectFit="contain"
                className={styles.postRevealImg}
              ></Image>
            </a>
          </Link>
        </div>

        {/* 文字展示部分 */}

        <div className={postText}>
          <p className={styles.postTime}>{timeFormatte(date, "mixTime")}</p>
          <h3 className={styles.postTitle}>
            <Link href={`/articles/${slug}`}>
              <a>{title}</a>
            </Link>
          </h3>
          <p className={styles.postsummary}>{description}</p>

          <p className={styles.articleMode}>生活日常</p>
        </div>
      </div>
    </>
  );
}
