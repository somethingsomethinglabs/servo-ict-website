# Starter offer assumptions

These are provisional commercial assumptions used for the customer-flow implementation on 19 September 2026. The owner must confirm or revise them before treating the page as a final offer.

- Setup fee: A$1,500.
- Tax wording: all prices are in AUD and GST is not currently charged.
- Website scope: up to 3 core pages.
- Email scope: one business mailbox for one user.
- Account work: domain and DNS setup, plus multi-factor authentication and recovery details for the accounts included in the quote.
- Content and review: help shaping supplied business details into copy, one consolidated review, and a practical walkthrough.
- Annual running-cost allowance: A$300–A$600 a year for one domain, basic website hosting and one business mailbox. This is a provisional planning estimate, not a quote or a claim about any vendor's price. The range allows for different suppliers, plans, renewal rates and taxes. Suppliers bill their actual charges, which are confirmed in the written quote.
- Exclusions shown on the page: online stores and payment processing; custom booking systems, customer accounts and complex software connections; logo design, photography and legal writing; ongoing content changes or support after the walkthrough.
- Later work: edits, extra pages, extra mailboxes and other additions need a separate quote.
- Timing: no delivery time is promised on the website. The written quote confirms timing.

The customer-facing source of truth is `src/lib/starterOffer.ts`. Update that module when the offer changes, then check both `/` and `/start-a-business/`.
