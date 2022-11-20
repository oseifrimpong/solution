# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The `deterministicPartiitionKey` function attempts to build a key from the given payload, the main conditions here is to use what is provided if available. Meaning, if the input payload already includes a partition key, we should attempt to use it first. The constraints applied on the expected key is a 256 character limit and hence if the provided key does not meet this criteria, we create a `sha3-512` hash of the provided key.
My approach to this refactor was to return early to avoid nested if statements which makes the code a lot more readable since you can clearly see the points at which decisions were made.