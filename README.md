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
- Participant reveals their answers
- Administrator announces the answer to the question.
- Participants receives payout

## Open Questions

- Is the randomization logic random enough?
- Are there better way to verify so that you don't need to remember the nonce at client side? 

## TODO

- Submission deadline
- Open submission deadline
