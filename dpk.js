const crypto = require("crypto");

/**
 * @function deterministicPartitionKey
 *
 * A function to generate a partition key from an input event
 * with preference for a already defined key within the payload
 *
 * @param {*} event Any event that could also include a partitionKey
 * @returns {String} Partition Key
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // If no event is specified, return "0"
  if (!event) return TRIVIAL_PARTITION_KEY;

  // If no partition key is specified in input, return a hash of the event
  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // If specified partition key in input is not a string, convert it to a string
  const candidate = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey;

  // If the stringified version of the partition key is less than or equal to the limit, we can directly use it
  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }
  return crypto.createHash("sha3-512").update(candidate).digest("hex");
};
