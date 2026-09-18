export const starterOffer = {
  name: "Business starter setup",
  setupPrice: 1500,
  setupPriceDisplay: "A$1,500",
  pageLimit: 3,
  mailboxLimit: 1,
  reviewRounds: 1,
  annualBudgetNote: {
    display: "A$300–A$600 a year",
    label: "Planning estimate, not a quote",
    description:
      "Use this allowance for one domain, basic website hosting and one business mailbox. Your suppliers bill their actual charges, and your written quote confirms the services chosen.",
  },
  inclusions: [
    "A clear, mobile-friendly website with up to 3 core pages",
    "One business email mailbox for one user",
    "Your website address connected to the website and business email",
    "An extra sign-in check and recovery details for the website, domain and email accounts in scope",
    "Help shaping your supplied business details into website copy",
    "One consolidated review and a practical walkthrough",
  ],
  thirdPartyCosts:
    "Domain registration, website hosting and email subscriptions are billed separately. The planning allowance is not a supplier price or a fixed charge.",
  exclusions: [
    "Online stores and payment processing",
    "Custom booking systems, customer accounts and complex software connections",
    "Logo design, photography and legal writing",
    "Ongoing content changes or support after the walkthrough",
  ],
  taxNote: "All prices are in AUD. GST is not currently charged.",
  laterWork:
    "Later edits, extra pages, extra mailboxes and other additions are quoted before work starts.",
  quoteNote:
    "Your written quote confirms the final scope, responsibilities, third-party costs and timing before work starts.",
} as const;

export const starterSetupPrice = starterOffer.setupPriceDisplay;
