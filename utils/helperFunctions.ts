export const makeCounter = (start = 1) => {
  let n = start;
  return (title: string) => `TC${String(n++).padStart(3, '0')} - ${title}`;
};
export const optimizeLinks = (s: string) =>
  s .toLowerCase()
    .trim()
    .replace(/^\/+/, '') // bỏ "/" đầu chuỗi
    .replace(/&/g, '') // bỏ ký tự "&"
    .replace(/\s+/g, '-'); // thay khoảng trắng = "-"
