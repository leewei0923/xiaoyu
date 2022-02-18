import styles from './header.module.css';

export default function Headers() {
  return (
    <header className={styles.headerBg}>
      <div className={styles.mask}>
        {/* 名人名言  */}

        <div className={styles.mottoContainer}>
          <p className={styles.content}>
            多活十年又如何。你最多能比别人多活80或90岁那十年。不能多活20岁这十年。
          </p>

          <p className={styles.space}>-</p>
          <p className={styles.author}>三坨土</p>
        </div>

        {/*  */}
      </div>
    </header>
  );
}
