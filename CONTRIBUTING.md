_First updated: October 13, 2026_

# Contributing to `yakthung-utils`

Thank you for your interest in contributing to `yakthung-utils`. This project aims to make Devanagari–Sirijanga conversion easier to use in JavaScript applications and to support the responsible digital documentation of Yakthung language and knowledge.

Contributions from developers, Yakthung speakers, educators, researchers, and other interested community members are welcome. You do not need to be an expert in every area: careful testing, documentation, bug reports, and constructive review are valuable contributions.

## Ways to contribute

You can help by:

- Reporting incorrect, incomplete, or inconsistent transliteration results.
- Improving conversion logic, tests, error handling, and maintainability.
- Adding verified mappings, examples, and documentation.
- Reviewing spelling, orthographic, and mapping decisions with appropriate language knowledge.
- Improving accessibility, developer experience, and compatibility.
- Sharing relevant references or explaining the reasoning behind a proposed change.

## Before opening an issue

Please search existing issues to avoid duplicates. When reporting a conversion problem, include as much of the following as you can:

- The input text and the actual output.
- The expected output, if known.
- The direction of conversion (Devanagari to Sirijanga or Sirijanga to Devanagari).
- A minimal example that reproduces the issue.
- A reliable reference or explanation supporting the expected result, where available.
- The package version and Node.js version, if relevant.

Please do not publish private, sacred, restricted, or otherwise sensitive cultural knowledge without appropriate permission and community consultation.

## Submitting code changes

1. Fork the repository and create a branch for your change.
2. Keep changes focused and explain the problem they solve.
3. Add or update tests for changed behaviour, including relevant edge cases and reverse-conversion behaviour where applicable.
4. Run the test suite and confirm that existing tests still pass.
5. Update the README or other documentation when behaviour, examples, mappings, or public APIs change.
6. Open a pull request describing the change, why it is needed, how it was tested, and any references used.

Use clear commit messages. Avoid combining unrelated fixes into one pull request. Do not include generated files, credentials, access tokens, or unrelated formatting changes.

## Language and mapping contributions

Language conversion involves linguistic choices, and a transliteration mapping may not represent every dialect, spelling convention, or context. Please:

- Distinguish established conventions from proposed or uncertain mappings.
- Provide examples and sources or explain the community knowledge behind a suggestion.
- Avoid presenting a disputed form as universally accepted.
- Preserve relevant Unicode characters accurately; visually similar characters may have different code points.
- Add regression tests for every confirmed mapping or bug fix.
- Ask for review when a change could affect existing users or has cultural or linguistic implications.

When reliable evidence is not available, document the uncertainty instead of guessing. The project welcomes respectful discussion and corrections.

## Tests and release quality

Before submitting a pull request, run the project's documented test command (currently expected to be `npm test`, if configured). Check that:

- The tests pass locally.
- New behaviour has appropriate tests.
- Existing mappings and unrelated functionality are not unintentionally changed.
- Documentation and examples match the implementation.

Do not publish a new npm version from a feature branch. Releases should be made from reviewed, tested code in the main repository.

## Respectful collaboration and cultural responsibility

Be respectful when discussing language, identity, orthography, traditions, and differences in community practice. Critique ideas and code constructively, not people. Explain disagreements with examples and evidence where possible.

This project seeks to make cultural and linguistic technology more accessible, not to claim ownership over Yakthung language or cultural knowledge. Contributors should share only material they have the right and appropriate permission to share. A public repository is not automatically an appropriate place for every kind of cultural information.

Community members and knowledgeable reviewers should have meaningful opportunities to correct, contextualize, or challenge representations of their language and culture. Where a topic is sensitive or contested, pause publication until the relevant concerns have been considered.

## Attribution and reuse

The package is licensed under the MIT License; see `LICENSE` for the terms. Please follow that license when reusing or distributing the software.

If `yakthung-utils` helps your project, we kindly encourage you to acknowledge it in your README, documentation, acknowledgments, or project credits, and link to the repository:

https://github.com/Ningsang-Jabegu/yakthung-utils

Additional attribution beyond the MIT License requirements is a request, not a condition imposed by this contribution guide. We believe voluntary recognition helps others discover the project and creates opportunities for more people to participate.

## Contributor expectations

By submitting a contribution, you confirm that, to the best of your knowledge, you have the right to submit it and that you have identified relevant sources, permissions, or restrictions. Do not submit copied material, confidential information, or third-party content unless its use is permitted and its provenance is documented.

A pull request may be discussed, revised, deferred, or declined if it is outside the project's scope, lacks sufficient evidence, introduces regressions, or raises unresolved linguistic, legal, privacy, or cultural concerns. Maintainers should explain decisions respectfully.

## A shared goal

We hope `yakthung-utils` can help support long-term digital preservation, research, education, and community collaboration. We also hope this project inspires other cultural communities to create tools for their own languages, scripts, histories, and traditions.

Software can help communities document and pass on knowledge, but it should be developed with care, transparency, and respect for the people whose knowledge it represents.

Thank you for helping build a useful and responsible resource.
