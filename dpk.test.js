const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {

  const encrypter = (obj) => {
    return crypto.createHash("sha3-512").update(obj).digest("hex");
  };

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event.partitionKey when even.partitionKey length < 256", () => {
    const event = {
      partitionKey: "1".repeat(255)
    }
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  it("Returns event.partitionKey when even.partitionKey length === to 256", () => {
    const event = {
      partitionKey: "1".repeat(256)
    }
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  it("Returns hash of event.partitionKey when event.partitionKey length is > 256", () => {
    const event = {
      partitionKey: "1".repeat(257)
    }
    expect(deterministicPartitionKey(event)).toBe(encrypter(event.partitionKey));
  });

  it("Returns stringified response when event.partitionKey is not a string", () => {
    const event = {
      partitionKey: {}
    }
    expect(deterministicPartitionKey(event)).toBe(JSON.stringify(event.partitionKey));
  });

  it("Returns stringified response when event.partitionKey is falsy", () => {
    const event = {
      partitionKey: false
    }
    expect(deterministicPartitionKey(event)).toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"))
  })
});