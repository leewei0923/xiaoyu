import crypto from "crypto";

const key = "34725295ea78b624";
const iv = "efcf77768be478c4";

// 加密方法
export const enCode = (src) => {
  let sign = "";
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv); // createCipher在10.0.0已被废弃
  sign += cipher.update(src, "utf8", "hex");
  sign += cipher.final("hex");
  return sign;
};

export const deCode = (sign) => {
  let src = "";
  const cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  src += cipher.update(sign, "hex", "utf8");
  src += cipher.final("utf8");
  return src;
};
