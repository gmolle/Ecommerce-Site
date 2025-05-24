// Generated random serial numbers that are used to apply the same serial number to the item every full rerender
let serialnums = [
  "Plzjt7DZc6",
  "I025wG0JKV",
  "mBxJJN8JRu",
  "MEOCjOIChP",
  "KKbnGqg0KN",
  "hmNJduxL9l",
  "P5ZZZcOlFN",
  "Qzfmk6wno4",
  "3N1qujHksQ",
  "7zep2qTqqz",
  "NbGyRsnXvH",
  "S3YZgEckLb",
  "K6Xk2JPksF",
  "xPSLNExHI2",
  "mW81llxvna",
  "D0DtsPqlYK",
  "JPGBHiUL9N",
  "0xDZRoP2mL",
  "aHA7DQH7So",
  "Cl9V4VB9vt",
];
export const generateRandomSerialNum = (index) => {
  return serialnums[index];
};

export const generateRandomQuantity = () => Math.floor(Math.random() * 20) + 1;
