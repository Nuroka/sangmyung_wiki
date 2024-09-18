import styles from "./Login.module.css";

export default function LoginForm({ label, type, id, value, handleChange }) {
  return (
    <div className={styles.loginD}>
      <label htmlFor={label}>{label}</label>
      <br />
      <input
        className={styles.loginInput}
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
