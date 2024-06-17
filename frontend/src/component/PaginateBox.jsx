import styles from "./PaginateBox.module.css";

export default function PaginateBox({ currentPage, totalPages, paginate }) {
  return (
    <div className={styles.paginateBox}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageBtn}
      >
        &lt; Prev
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageBtn}
      >
        Next &gt;
      </button>
    </div>
  );
}
