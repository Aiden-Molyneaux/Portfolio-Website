// Optional live endpoint for the GitHub contribution calendar ([[date, count], ...]). Empty on purpose: the
// site renders the bundled snapshot, which .github/workflows/refresh-contributions.yml refreshes daily.
// Set it only if a live endpoint is added later; the page swaps in its data when it answers.
export const CONTRIB_URL = '';
