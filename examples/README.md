# Learn Fubby by example

These standalone projects use the Fubby 0.1.0 preview executable. No Rust compiler or interpreter source checkout is required. Install Fubby, put it on PATH, and confirm `fubby --version`. Use the M20 archive in this repository (SHA-256 `505c61cfa826764a4eb127acff5cacb2d8b9d67805bd0210bb965764bb52a670`). The shared 0.1.0 version string alone does not identify its milestone. See [installation instructions](../README.md#install-on-macos-intel).

Download this repository using GitHub **Code → Download ZIP**, extract it, and open `examples`. You can also clone the downloads repository. Start with folder 01 and work downward. Each folder includes its own commands, expected behavior, and any generated files. Run commands from the folder named in its README, not from this index directory.

| Folder | What you learn | Milestone |
| --- | --- | --- |
| [01-hello](01-hello/README.md) | Hello and expressions | M1 |
| [02-control-flow](02-control-flow/README.md) | Types and control flow | M2 |
| [03-functions](03-functions/README.md) | Functions and recursion | M3 |
| [04-classes](04-classes/README.md) | Classes and encapsulation | M4 |
| [05-inheritance](05-inheritance/README.md) | Inheritance and interfaces | M5 |
| [06-collections-imports-errors](06-collections-imports-errors/README.md) | Collections, imports, and exceptions | M6 |
| [07-standard-library](07-standard-library/README.md) | Strings, math, files, and time | M7 |
| [08-runtime](08-runtime/README.md) | Runtime execution | M9–10, M18 |
| [09-core-library](09-core-library/README.md) | Collections, JSON, encoding, and environment | M11 |
| [10-moon](10-moon/README.md) | Moon SQLite and network policy | M12 |
| [11-shady](11-shady/README.md) | Shady developer tools | M13 |
| [12-snow](12-snow/README.md) | Snow web application | M14 |
| [13-bela](13-bela/README.md) | Bela tasks and channels | M15 |
| [14-smokey](14-smokey/README.md) | Smokey local packages | M16 |
| [15-integrated-app](15-integrated-app/README.md) | Integrated notes application | M17 |

## CLI and release milestones

M8 adds the CLI workflow: try `fubby init my-first-project` in a fresh working directory, then `fubby check my-first-project/src/main.fab` and `fubby run my-first-project/src/main.fab`. `fubby repl` evaluates independent single-line inputs; it does not retain variables between lines.

M9–10 and M18 focus on runtime hardening; folder 08 demonstrates ordinary execution on that runtime. M19–20 focus on installation, packaging, and compatibility; install the binary before following these examples. These milestones do not need duplicate application folders.

The examples intentionally include readable `.fab` application source. They do not contain the Rust interpreter implementation. Runtime safety limits do not make untrusted programs safe. Web demos are local development examples. Stop one server before starting the next on port 8080.
