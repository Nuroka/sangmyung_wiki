// 라이선스 선택 드롭다운 컴포넌트
export default function LicenseDropdown() {
  return (
    <select id="license" name="license">
      <option value="CC BY">CC BY</option>
      <option value="CC BY-SA">CC BY-SA</option>
      <option value="CC BY-NC">CC BY-NC</option>
      <option value="CC BY-NC-SA">CC BY-NC-SA</option>
      <option value="CC BY-NC-ND">CC BY-NC-ND</option>
      <option value="CC BY-ND">CC BY-ND</option>
      <option value="Public Domain">Public Domain</option>
      <option value="GNU GPL">GNU GPL</option>
      <option value="Apache License">Apache License</option>
      <option value="MIT License">MIT License</option>
    </select>
  );
}
