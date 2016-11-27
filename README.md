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

## Open Discussion

- What should be the behavior if no one made correct choice?

## TODO

- [ ] Add time dependent tests (still finding out best ways to do it)
- [ ] Submission deadline
- [ ] Open submission deadline

## Out of scope

The followings are out of scope. Even though they are important, they are less related to the core logic of the application.

- circuit breaker
- rate limiting
- maximum usage
- contract upgrading
- bug bounty
