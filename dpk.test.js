const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  // This function takes anything as input, if input is undefined, it returns '0'
  // If the input does not specify the partition key, a hash is created from the input and is returned as the key
  // If input is not a string, it converts the input to a string
  // If the string is shorter than 256, max key length, it returns the string
  // If the string is longer than 256, it creates a hash and returns the hash
  it("Returns the a hash of the input when the input specifies no partitionKey", () => {
    const input = { random: "string" };
    const expectedKey = crypto.createHash("sha3-512").update(JSON.stringify(input)).digest("hex");
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(expectedKey);
  });

  it("Returns a stringified partitionKey value when length is less than 256", () => {
    const input = { partitionKey: { random: "string" } };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(JSON.stringify(input.partitionKey));
  });

  it("Returns hash of long partitionKey string value", () => {
    const longString = crypto.randomUUID().repeat(100);
    const input = { partitionKey: { value: longString } };
    const expectedKey = crypto.createHash("sha3-512").update(JSON.stringify(input.partitionKey)).digest("hex");
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(expectedKey);
  });

  it("Returns the partition key if it is a string and under the limit", () => {
    const longString = crypto.randomUUID().repeat(100);
    const partitionKey = crypto.createHash("sha3-512").update(longString).digest("hex");
    const input = { partitionKey };
    const trivialKey = deterministicPartitionKey(input);
    expect(trivialKey).toBe(partitionKey);
  });
});
