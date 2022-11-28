const crypto = require("crypto");

const encrypter = (obj) => {
  return crypto.createHash("sha3-512").update(obj).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if(!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return encrypter(JSON.stringify(event));
  }

  if (typeof event.partitionKey === "string") {
    if (event.partitionKey.length <= MAX_PARTITION_KEY_LENGTH) {
      return event.partitionKey;
    } else {
      return encrypter(event.partitionKey);
    }
  } else {
    const candidate = JSON.stringify(event.partitionKey);
    if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
      return candidate;
    } else {
      return encrypter(candidate);
    }
  }
};