# Currency converter review plan

The converter fetches rates from an external provider. The existing hook cancels stale requests and clears rates when an error occurs.

## Test scenarios

1. Convert a positive amount and compare the displayed result with the provider's returned rate.
2. Change source currencies quickly under network throttling; stale responses must not replace the latest rates.
3. Simulate HTTP errors and malformed provider data; no misleading conversion should be shown.
4. Exercise zero, negative, empty, and non-numeric amounts and record the current UI behavior.
5. Verify keyboard navigation, mobile layout, loading states, and currency labels.

Exchange rates are time-sensitive; do not embed a fixed live rate in an assertion. This test plan does not establish that every scenario is implemented or passing.
