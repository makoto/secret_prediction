# Secret Prediction market

This is a sample prediction market with a twist.
No one knows other people's answer while submitting their bet so that their prediction is solely based on their own decision without influence of the others.

## Motivation of the project

I added the twist so that I can understand more about understanding encryption and secure verification.

Some references

- [Step by Step Towards Creating a Safe Smart
Contract: Lessons and Insights from a
Cryptocurrency Lab](http://fc16.ifca.ai/bitcoin/papers/DAKMS16.pdf)
- [Bitcoin and Cryptocurrency Technologies](https://d28rh4a8wq0iu5.cloudfront.net/bitcointech/readings/princeton_bitcoin_book.pdf) = '9.3: Secure Multi‐Party Lotteries in Bitcoin' at p247

## Functionalities.

- Administrator adds a yes/no question
- Participant submits yes/no bet in encrypted way.
- Participant opens their answers
- Administrator reports the answer to the question.
- Participants receives payout

## Things I would like to get feedback from.

- Is the randomization logic random enough?
- Are there better way to verify so that you don't need to remember the nonce at client side?
- Am I using right data types for right values?
- Does it have any potential of buffer overflow?
- Are all the necessary attack vectors blocked?

## Security check

- [x] Correct deposit(`msg.value`) has to be set
- [x] Correct `nonce` has to be set to reveal the bet
- [x] No left over Ether in the contract
- [x] Only contract owner can `report` the answer
- [x] Does not accept empty string to `report`
- [x] Does not accept empty value(0) to `encrypted_choice`
- [x] Set date limit on `open`, `submit`, and `report` period

## Open Discussion

- What should be the behavior if no one made correct choice?

## [PR feedbacks]()

### Security vulnerability

- Stop multiple withdraw

### Coding styles

- Use `assert.strictEqual` over `assert.equal()`
- Use `library` for utility contract (eg: `Util`)
- Use `camelCase` for both function and variable names

### Expressive styles (makes coding intention clearer)

- Use `constant` where applicable
- Use verb for modifier (eg:  `hasCorrectDeposit` over `correctDeposit`)
- Use `Log*` prefix for event name
- Throw if input arg is empty (= `0x`)

### Effective styles (doing same thing but more concise)

- `sha3(nonce, choice)`
- Promisify event callbacks
- `web3.sha3(Math.random(), new Date().getTime())`
- Share library logic (eg: hashing) between front (js) end and backend(solidity) by exposing it as a constant function
- Use `struct Status{}` to group all the variables you want to expose externally

### Optimal styles (eg: less storage, potentially less gas usage)

- Scope event watching with `fromBlock`, and `toBlock` (and use `eth.getTransactionReceipt(hash)` to get the block number)
- Do data calculation (eg:start_at + submit_period) at construct
- Use `bytes32` over `string` for if variable values are known to be short (eg: `Yes` or `Y`)
- Compare string by converting into byte(eg: `bytes(a) == bytes(b)`)

## Out of scope

The followings are out of scope. Even though they are important, they are less related to the core logic of the application.

- circuit breaker
- rate limiting
- maximum usage
- contract upgrading
- bug bounty
