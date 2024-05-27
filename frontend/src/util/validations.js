// 이메일
export function isEmail(value) {
  if (!value.includes("@")) {
    return false;
  }

  const domain = "sangmyung.kr";
  const emailDomain = value.split("@")[1];

  return emailDomain === domain;
}

// 아이디
export function isUserName(value) {
  return !hasSpace(value);
}

// 비밀번호
export function isPassword(value) {
  return !hasSpace(value) && hasRightLength(value, 8, 20);
}

// 비밀번호 확인
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

function hasSpace(value) {
  return value.includes(" ") || value.trim() === "";
}

function hasRightLength(value, minLength, maxLength) {
  return value.length >= minLength && value.length <= maxLength;
}
