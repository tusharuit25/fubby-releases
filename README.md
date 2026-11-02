# Fubby 0.1.4 developer preview

![Fubby Programming Language textbook cover](Fubby%20Programming%20Language%20Textbook%20Cover.png)

Fubby is an all-in-one programming language: one program includes the language,
a web server, a SQLite database, a test runner, a formatter, a linter, and a
package manager. This download is the **Fubby 0.1.4
macOS Intel binary bundle**. It is intended for evaluation, learning, and
local development. It is experimental and is not production-ready.

**Fubby is now available for Linux and Windows.** Get the
[Linux build](#linux), or the [Windows beta](#windows-beta).

The bundled starter demonstrates Fubby Core, Moon HTTP and SQLite, Shady,
Snow, Bela, and Smokey together. The archive contains the Fubby executable,
install/uninstall scripts, documentation, a checkout-independent smoke
runner, and example `.fab` application/package source. It does not contain the
Rust implementation source.

## Preview status and platform support

| Platform | Status |
| --- | --- |
| macOS Intel (`x86_64-apple-darwin`) | **Released: 0.1.4.** Tested on a real Intel Mac. |
| macOS Apple Silicon (`aarch64-apple-darwin`) | Not verified; do not assume compatibility. |
| Linux x86-64 (`x86_64-unknown-linux-gnu`) | **Released: 0.1.4.** Built and tested on Ubuntu 24.04. Needs glibc 2.34 or later. See [Linux](#linux). |
| Linux ARM64 (`aarch64-unknown-linux-gnu`) | No download yet. |
| Windows 10 or later, x86-64 (`x86_64-pc-windows-gnu`) | **Released: 0.1.4 beta.** Available to download now from the [`windows-beta`](windows-beta/) folder. |

Fubby is currently version `0.1.4` on every platform.
Language syntax, CLI behavior, and APIs may change during the 0.x preview. Fubby is
free to use under the [Fubby Software License](LICENSE.txt); see the license section below.

## Linux

Fubby 0.1.4 for Linux was built and tested on Ubuntu 24.04, on x86-64. It needs
glibc 2.34 or later, so it should also run on Ubuntu 22.04, Debian 12, RHEL,
Rocky and Alma Linux 9, Fedora 35 or later, and Amazon Linux 2023. It won't run
on older systems such as Ubuntu 20.04, or on Alpine, which doesn't use glibc. To
see your glibc version, run `ldd --version`.

### Download and verify on Linux

```sh
curl -LO https://github.com/tusharuit25/fubby-releases/raw/main/fubby-0.1.4-x86_64-unknown-linux-gnu.tar.gz
sha256sum fubby-0.1.4-x86_64-unknown-linux-gnu.tar.gz
```

The second command must print this value. Stop if it differs.

```text
df763ab2f761956a79b3605f85d5db816fcf7a4f1fca05ce371db4bde710d52e
```

### Install on Linux

```sh
tar -xzf fubby-0.1.4-x86_64-unknown-linux-gnu.tar.gz
cd fubby-0.1.4-x86_64-unknown-linux-gnu
./install.sh
export PATH="$HOME/.local/bin:$PATH"
fubby --version
```

The installer copies only `fubby` into `~/.local/bin`, and never uses `sudo`. To
keep `fubby` available in new terminals, add the `export` line to `~/.bashrc`. To
uninstall, run `./uninstall.sh` from the same folder. If you see
`GLIBC_2.34 not found`, your Linux is too old for this build.

## Windows beta

Fubby 0.1.4 for Windows is out now, as a **beta**. It's brand new, so you may be
one of the first people to run it, and you may hit bugs. When you do, please
[report them](#report-a-windows-problem), so they can be fixed in the next release.

- Needs Windows 10 or later, on an x86-64 (Intel or AMD) PC.
- Comes as a zip file with a PowerShell installer that doesn't need administrator
  rights.
- Isn't signed, so Windows SmartScreen may warn you before it runs.

### Download and verify

Download [`fubby-0.1.4-x86_64-pc-windows-gnu.zip`](https://github.com/tusharuit25/fubby-releases/raw/main/windows-beta/fubby-0.1.4-x86_64-pc-windows-gnu.zip)
from the [`windows-beta`](windows-beta/) folder. In PowerShell, from the folder you saved it in,
check its SHA-256:

```powershell
Get-FileHash .\fubby-0.1.4-x86_64-pc-windows-gnu.zip -Algorithm SHA256
```

The expected value is below. PowerShell prints it in capitals, which doesn't
matter. Stop if it differs.

```text
f87bb718421d510d19b8557bd8f302b3d65067362a0d2379e7578c15d5caa0ec
```

### Install

```powershell
Expand-Archive .\fubby-0.1.4-x86_64-pc-windows-gnu.zip -DestinationPath .
cd .\fubby-0.1.4-x86_64-pc-windows-gnu
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

`-ExecutionPolicy Bypass` lets this one script run without changing your
PowerShell settings. The installer copies `fubby.exe` to
`%LOCALAPPDATA%\Programs\Fubby\bin` and adds that folder to your user PATH.
Add `-Prefix <folder>` to install somewhere else, or `-NoPath` to leave PATH
alone.

Open a new terminal, then check it works:

```powershell
fubby --version
fubby init hello-app
```

Restart VS Code afterwards, so the Fubby plugin can find `fubby`.

To uninstall, run `powershell -ExecutionPolicy Bypass -File .\uninstall.ps1` from
the same folder. It removes `fubby.exe` and its PATH entry, and never touches your
projects.

### Report a Windows problem

[Open an issue](https://github.com/tusharuit25/fubby-releases/issues/new) with:

- your Windows version (run `winver`)
- the output of `fubby --version`
- the command you ran, and what happened

## Performance compared with Python

We ran the same eight programs in Fubby 0.1.4 and Python 3.14, and checked that both
printed exactly the same output. Each time is the median of 5 runs on an Intel Core i5
MacBook Pro, and includes starting the program.

| Program | What it does | Fubby | Python | Fubby is |
| --- | --- | ---: | ---: | --- |
| Strings | Build a 130 KB string with 20,000 appends | 28 ms | 130 ms | 4.6× faster |
| SQLite | Insert 20,000 rows, then sum them | 126 ms | 84 ms | 1.5× slower |
| Maps | Insert 50,000 keys, then look each one up | 110 ms | 70 ms | 1.6× slower |
| Lists | Add 90,000 items, then read each one | 99 ms | 54 ms | 1.8× slower |
| Loops | 3,000,000 rounds of arithmetic | 1,218 ms | 455 ms | 2.7× slower |
| JSON | Encode and decode 1,000 rows, 200 times | 766 ms | 275 ms | 2.8× slower |
| Function calls | Recursive `fib(25)`, about 243,000 calls | 192 ms | 44 ms | 4.4× slower |
| Objects | Create 400,000 objects and call methods on them | 1,807 ms | 108 ms | 16.8× slower |

Fubby starts in about 5 ms and Python in about 35 ms, which helps Fubby on short
programs. Python's JSON module is written in C.

**Web server.** With 4 workers, Snow answered a small JSON request 3,381 times a
second, against 3,065 for Python's standard-library threading server, which isn't a
production server. Snow's slowest 1% of requests took 3.9 ms, against 32 ms for
Python. In a 20-minute test through JSON and SQLite, Snow served 934,642 requests with
no errors, and its memory stayed flat at about 6 MB.

### Closing the gap

We're working on closing these gaps. The next release makes objects 2.6 times faster,
to about 6 to 7 times slower than Python. It also makes lists 1.7 times faster, and
function calls and loops 1.3 times faster. These are measured, but not released yet.

After that, we're working on:

- fewer memory allocations for each function call and each object
- reading each operator once, instead of comparing its text every time it runs
- sharing strings instead of copying them every time they're read

We'll publish new numbers with every release.

## What's new in 0.1.4

Fixes found by new benchmarks against Python. The language is the same as 0.1.3,
and 0.1.4 is available for macOS, Linux, and Windows (beta).

- **Scripts run without preview limits.** A script started with `fubby run` has
  no step, time, or memory limit unless you set one with `FUBBY_MAX_STEPS`,
  `FUBBY_TIMEOUT_MS`, or `FUBBY_MAX_ALLOC_BYTES`. Before, it stopped after
  2,000,000 steps or 10 seconds. Web requests, Bela tasks, Shady, and the REPL
  keep their limits.
- **Servers stay up.** A route that builds a value referring to itself, such as
  a list that contains itself, no longer stops every route after a few hundred
  requests. Such values are freed when the request ends.
- **Fast string building.** `text = text + piece` and `text += piece` grow the
  string in place, and the new `str_join(items, separator)` joins a list.
- **Bigger data.** JSON decoding is about 5 times faster. Strings and JSON can be
  up to 16 MiB instead of 1 MiB, and lists and maps can hold 10,000,000 items
  instead of 100,000.
- **SQLite under load.** Database files use write-ahead logging, and statements
  wait up to 5 seconds for a lock instead of 1, so several Snow workers can share
  a database without timing out. Keep database files on a local disk.

## What's new in 0.1.3

0.1.3 adds Linux and Windows downloads. The language is the same as 0.1.2. On
every platform:

- `fubby shady fmt` keeps Windows (CRLF) line endings in files that use them.
- Packages are refused if they contain file names Windows can't use, such as
  `CON` or `NUL`, so every package works on every platform.

There was no macOS build of 0.1.3.

## What's new in 0.1.2

Fubby now has a license: free to use, including for business. See the license
section below. The archive includes the license and third-party notices. The
language is the same as 0.1.1.

## What's new in 0.1.1

- **Mistakes found before a program runs.** `fubby check` now reports undefined
  names, wrong arguments, certain type mismatches, and unknown members with
  their line and column. `fubby run` applies the same checks first.
- **New language features:** `break`, `continue`, `match`, `null` with optional
  types such as `String?`, the `List`, `Map`, and `Any` types, `list[0] = x`,
  `map["k"] = x`, and trailing commas.
- **Bugs fixed:** `let` now works inside loops. Functions can take lists and
  maps, classes can hold other objects, and interfaces work as types. Names can
  use Indian scripts, such as `नमस्ते`.
- **Fewer crashes:** deeply nested code and values, lists that contain
  themselves, and closed output pipes now end with a clear result. Uncaught
  runtime errors name their file and line.

**Upgrading from 0.1.0 can break existing programs:**

- `break`, `continue`, `match`, `case`, and `null` are now reserved words.
- A variable declared in a block no longer exists after that block.
- A `for` variable no longer exists after its loop, and can't reuse a name that
  is still in scope.
- `list_remove` returns a new list without the item. It used to return the item
  and leave the list unchanged.
- `fubby run` refuses a program with a checker error, even on a line that would
  never have run.
- `main` must take no parameters and return nothing.
- A child class can't read a parent's private member; declare it `protected`.

## Download and verify

The archive file in this repository is:

```text
fubby-0.1.4-x86_64-apple-darwin.tar.gz
```

Download that file from the repository's file list to a local directory. Before extraction, compute SHA-256 on macOS:

```sh
shasum -a 256 fubby-0.1.4-x86_64-apple-darwin.tar.gz
```

The expected value for this exact archive is:

```text
a78ecc719189d64c64b216da008283ed88f25d5948aaea0cac61c898b8e7d55b
```

Stop if the digest differs. A SHA-256 digest detects accidental changes only
when the expected value comes from a trusted channel. This archive is unsigned;
the checksum does not authenticate its publisher or build provenance.

## Install on macOS Intel

The installer places only `fubby` in a user-owned prefix. It defaults to
`$HOME/.local` and does not use `sudo`.

```sh
tar -xzf fubby-0.1.4-x86_64-apple-darwin.tar.gz
cd fubby-0.1.4-x86_64-apple-darwin
./install.sh
export PATH="$HOME/.local/bin:$PATH"
fubby --version
```

The packaged binary reports target, build profile, and Rust compiler metadata.
If macOS reports that the unsigned binary cannot be verified, do not bypass
Gatekeeper unless the artifact's provenance and authorization have been
independently approved. No notarization is provided.

By installing Fubby, you accept the [Fubby Software License](LICENSE.txt).

For Visual Studio Code, install the
[Fubby plugin](https://marketplace.visualstudio.com/items?itemName=twigsoftware.fubby).
Read more on the [Fubby website](https://fubby.twigsoftwares.com).

## Hello World and running `.fab` files

Create `hello.fab`:

```fubby
func main() {
    print("Hello, Fubby!")
}
```

Check it for mistakes, then run it:

```sh
fubby check hello.fab
fubby run hello.fab
```

Fubby source files use UTF-8 and the `.fab` suffix. A program run with
`fubby run` begins at a zero-argument `main` function.

## Runnable example projects

Follow the [15-project learning path](examples/README.md), from hello world
through the core language, standard library, Moon, Shady, Snow, Bela, Smokey,
and the integrated notes application. Each folder includes runnable `.fab`
source, instructions, and expected behavior.

Use **Code → Download ZIP** or clone this repository to obtain `examples/`.
Install the binary described above and put `fubby` on PATH; Rust is not
required. Keep each project's supporting assets and package folders together.

## CLI reference

The commands below were checked against the packaged `fubby --help`,
`fubby pkg --help`, `fubby shady --help`, and `fubby snow --help` output.

### Top-level commands

```text
fubby run <file.fab>
fubby check <file.fab>
fubby init <directory>
fubby pkg <init|add|remove|install|list|validate|pack|publish|verify> [options]
fubby repl
fubby shady <test|fmt|lint|debug|profile|docs> [options]
fubby snow <serve|stop> [options]
fubby --version
fubby --help
```

### Smokey package commands

```text
fubby pkg init [directory]
fubby pkg add <name> <version-constraint>
fubby pkg add <name> --path <directory>
fubby pkg remove <name>
fubby pkg install [--registry <local-directory>]
fubby pkg list
fubby pkg validate [--registry <local-directory>]
fubby pkg pack [archive]
fubby pkg publish --registry <local-directory>
fubby pkg verify <archive>
```

Registry operations are local only. Public/remote registry access and
publisher authentication are not implemented. A `publish` command can write to
a local registry directory; it does not publish to the internet.

### Shady developer tools

```text
fubby shady test [file.fab|directory]
fubby shady fmt [--check] <file.fab|directory>
fubby shady lint <file.fab|directory>
fubby shady debug <file.fab>
fubby shady profile <file.fab>
fubby shady docs <file.fab> [--output <new-file.md>]
```

Shady tests are zero-argument `test_*` functions in recognized test files.
Debug is a bounded execution trace, not an interactive debugger. Formatting
handles indentation, trailing whitespace, and a final newline; it does not
reflow code.

### Snow server commands and options

```text
fubby snow serve app.fab [options]
fubby snow stop <shutdown-file>

Options:
  --host <IP|localhost>
  --port <0..65535>
  --quiet
  --read-timeout-ms <1..30000>
  --write-timeout-ms <1..30000>
  --handler-timeout-ms <1..30000>
  --max-body-bytes <1..1048576>
  --max-response-bytes <1..10485760>
  --max-requests <1..1000000>
  --shutdown-file <absent-file>
  --workers <1..8>
  --queue-capacity <1..64>
```

Defaults are `127.0.0.1:8080` and serial request handling. Snow is an
experimental local development server.

## Keywords

Fubby has 32 keywords. They are reserved, so you can't use them as names for
variables, functions, classes, or anything else. Type names such as `Int`,
`String`, `List`, and `Any`, and the built-in roots `moon`, `snow`, and `bela`,
are not keywords.

### Declarations

| Keyword | What it does | Example |
| --- | --- | --- |
| `func` | Declares a function or method. A program starts at `main`. | `func add(Int a, Int b) -> Int { return a + b }` |
| `let` | Declares a variable. Its type can go before the name. | `let total = 0` or `let Int total = 0` |
| `const` | Declares a constant, which can't be assigned again. | `const limit = 5` |
| `import` | Loads another `.fab` file, or a file from an installed package. | `import "./greet.fab"` |
| `class` | Declares a class with fields, a constructor, and methods. | `class Square { ... }` |
| `interface` | Lists methods that a class promises to provide. | `interface Shape { func area() -> Int }` |
| `init` | Declares a class's constructor. Create an object with the class name, such as `Square(4)`. | `init(Int side) { this.side = side }` |

### Control flow

| Keyword | What it does | Example |
| --- | --- | --- |
| `if` | Runs a block when a condition is true. | `if total > 10 { print("big") }` |
| `else` | Runs a block when the `if` condition is false. It's also the fallback arm of `match`. | `} else { print("small") }` |
| `while` | Repeats a block while a condition is true. | `while n < 3 { n += 1 }` |
| `for` | Loops over a range or a list. | `for i in 1..10 { ... }` |
| `in` | Separates the loop variable from what it loops over. A range such as `1..3` includes 3. | `for color in colors { ... }` |
| `break` | Leaves the nearest loop. It's only allowed inside a loop. | `if i > limit { break }` |
| `continue` | Skips to the next round of the nearest loop. It's only allowed inside a loop. | `if i == 2 { continue }` |
| `match` | Runs the first `case` that equals a value. Arms never fall through. | `match n { case 0 { ... } else { ... } }` |
| `case` | One arm of a `match`. It can list several values. | `case 1, 2, 3 { return "small" }` |
| `return` | Ends a function, optionally with a value. | `return a + b` |

### Errors

| Keyword | What it does | Example |
| --- | --- | --- |
| `throw` | Raises an error, usually with a message. | `throw "something went wrong"` |
| `try` | Runs a block, and sends any error it raises to `catch`. | `try { ... }` |
| `catch` | Handles the error. `error_message(err)` gives its text. | `catch (err) { print(error_message(err)) }` |

### Classes and visibility

| Keyword | What it does | Example |
| --- | --- | --- |
| `extends` | Makes a class inherit from a parent class. | `class Square extends Base { ... }` |
| `implements` | Says a class provides an interface's methods. List several with commas. | `class Base implements Shape { ... }` |
| `abstract` | Marks a class that can only be extended, not created directly. | `abstract class Base { ... }` |
| `override` | Replaces a method from the parent class. The class must have a parent. | `public override func area() -> Int { ... }` |
| `super` | Calls the parent class's version of a method. | `return "big " + super.name()` |
| `this` | The current object, inside a class. | `this.side = side` |
| `public` | Lets code anywhere use a field or method. | `public func area() -> Int { ... }` |
| `private` | Limits a field or method to its own class. Members are private when no keyword is given. | `private Int side` |
| `protected` | Limits a field or method to its own class and its child classes. | `protected String label` |

### Values

| Keyword | What it does | Example |
| --- | --- | --- |
| `true` | The Boolean value true. | `let waiting = true` |
| `false` | The Boolean value false. | `waiting = false` |
| `null` | No value. Only a type ending in `?` can hold it. | `let String? nickname = null` |

### All 32 keywords in one program

Save this as `greet.fab`:

```fubby
func greet(String name) -> String {
    return "Hello, " + name
}
```

Save this as `keywords.fab` in the same folder:

```fubby
import "./greet.fab"

interface Shape {
    func area() -> Int
    func name() -> String
}

abstract class Base implements Shape {
    protected String label

    init(String label) {
        this.label = label
    }

    public func area() -> Int {
        return 0
    }

    public func name() -> String {
        return this.label
    }
}

class Square extends Base {
    private Int side

    init(Int side) {
        this.label = "square"
        this.side = side
    }

    public override func area() -> Int {
        return this.side * this.side
    }

    public override func name() -> String {
        return "big " + super.name()
    }
}

func size(Int n) -> String {
    match n {
        case 0 { return "zero" }
        case 1, 2, 3 { return "small" }
        else { return "large" }
    }
}

func main() {
    print(greet("Fubby"))

    const limit = 5
    let total = 0
    for i in 1..10 {
        if i == 2 {
            continue
        }
        if i > limit {
            break
        }
        total += i
    }
    print(total)

    let square = Square(4)
    print(square.name() + " has area " + square.area())
    print(size(2))

    let String? nickname = null
    let waiting = true
    while waiting {
        waiting = false
    }
    if nickname == null && waiting == false {
        print("no nickname")
    } else {
        print(nickname)
    }

    try {
        throw "something went wrong"
    } catch (err) {
        print("caught: " + error_message(err))
    }
}
```

Check it, then run it:

```sh
fubby check keywords.fab
fubby run keywords.fab
```

It prints:

```text
Hello, Fubby
13
big square has area 16
small
no nickname
caught: Fubby throw: something went wrong
```

Fubby's checker catches keyword mistakes before anything runs. For example, it
reports `Cannot assign to constant` for a `const`, `Cannot instantiate abstract
class` for an `abstract` class, and `Private property` when code outside a class
reads a `private` or `protected` member.

## Language fundamentals

### Variables, operators, control flow, and functions

```fubby
func total_through(Int limit) -> Int {
    let total = 0
    let i = 1
    while i <= limit {
        total += i
        i += 1
    }
    return total
}

func main() {
    const base = 10
    let amount = total_through(5)
    if amount >= base && true {
        print("sum=" + amount)
    } else {
        print("small sum")
    }
}
```

The language supports `let` bindings, `const` bindings, type annotations written
before the name (`let Int count = 1`), `if`/`else`, `while`, `for name in
collection`, `break`, `continue`, `match`, `return`, and functions. A variable
declared in a block ends with that block. Types include `Int`, `Float`, `Bool`,
`String`, `List`, `Map`, `Any`, and declared classes and interfaces. Operators include `+ - * / %`, comparisons, `&&`, `||`, unary
`!`, and compound assignments. `+` also concatenates strings.

### Loops and match

```fubby
func kind(Int day) -> String {
    match day {
        case 6, 7 { return "weekend" }
        else { return "weekday" }
    }
}

func main() {
    for day in 1..7 {
        if day == 2 { continue }
        if day == 7 { break }
        let label = kind(day)
        print(label)
    }
}
```

`match` runs the first arm with an equal value. Arms never fall through.

### Null and optional types

A type holds `null` only if it ends in `?`. A plain `String` can never be null,
and `null` can't be used with `+`, so check for it first:

```fubby
func main() {
    let String? nickname = null
    if nickname == null {
        print("no nickname")
    }
    nickname = "Ash"
    print(nickname)
}
```

### Collections

```fubby
func main() {
    let colors = ["blue", "green"]
    let note = {"title": "Updated fieldnote", "public": false}
    print(colors[1])
    for color in colors {
        print(color)
    }
    print(note["title"])
    print(list_contains(colors, "blue"))
    print(map_keys(note))
    colors[0] = "red"
    note["public"] = true
    print(colors, note)
}

func total(List scores) -> Int {
    let sum = 0
    for score in scores {
        sum += score
    }
    return sum
}
```

Lists use integer indexes; maps use string keys. Both can be assigned through an
index. Use the `List` and `Map` types to pass them to functions. The standard
helpers provide bounded list/map operations.

### Classes, inheritance, and interfaces

```fubby
class BankAccount {
    private String owner
    private Float balance

    init(String owner, Float openingBalance) {
        this.owner = owner
        this.balance = openingBalance
    }

    public func deposit(Float amount) {
        this.balance += amount
    }

    public func getBalance() -> Float {
        return this.balance
    }
}

func main() {
    let account = BankAccount("Fubby", 100.0)
    account.deposit(25.0)
    print(account.getBalance())
}
```

Classes support fields, `init`, methods, visibility modifiers, inheritance,
interfaces, `this`, `super`, abstract declarations, and `override`. Interfaces
can be used as types. Members are private unless marked `public` or `protected`.
A field of a class type must be set in the constructor, or declared optional,
such as `Dog? pet`. See the packaged starter and examples for working
class/interface combinations.

### Exceptions

```fubby
func main() {
    try {
        throw "example failure"
    } catch (err) {
        print(error_message(err))
    }
}
```

`throw` raises a runtime error and `try`/`catch` handles it. Runtime deadlines
and cancellation are not made unlimited by catching an error.

### Modules and imports

The built-in roots `moon`, `snow`, and `bela` expose Moon, Snow, and Bela APIs
in their relevant runtime contexts. Legacy relative imports of `.fab` files
remain supported. Projects managed with Smokey may import installed files
using `package:<package-name>/<path>` after dependency installation.

```fubby
import "./helpers.fab"

func main() {
    print(helper_message())
}
```

The imported `helpers.fab` file can define the function used above:

```fubby
func helper_message() -> String {
    return "Hello from a relative module"
}
```

Relative imports are loaded from the importing file's directory. Keep imports
inside the project/package root; runtime file confinement applies where
configured.

## Fubby Core standard library

The currently implemented built-ins include:

- Strings: `str_upper`, `str_lower`, `str_trim`, `str_contains`,
  `str_replace`, `str_split`, `str_length`, `str_starts_with`,
  `str_ends_with`, `str_index_of`, `str_substring`, `str_repeat`, `str_join`.
- Math: `math_abs`, `math_floor`, `math_ceil`, `math_sqrt`, `math_pow`,
  `math_min`, `math_max`, `math_sin`, `math_cos`, `math_tan`, `math_log`,
  `math_exp`, `math_round`, `math_trunc`.
- Collections: `list_contains`, `list_index_of`, `list_reverse`, `list_slice`,
  `list_concat`, `list_insert`, `list_remove`, `map_keys`, `map_values`, `len`.
- Data: `json_encode`, `json_decode`, `encoding_hex_encode`,
  `encoding_hex_decode`, `encoding_base64_encode`,
  `encoding_base64_decode`.
- Environment and errors: `env_get`, `env_has`, `error_message`,
  `error_contains`.
- Time and randomness: `time_parse_utc`, `time_format_utc`,
  `time_is_leap_year`, `time_days_in_month`, `random_int`.
- Matching and files: `regex_is_match`, `file_read`, `file_write`,
  `file_exists`.

```fubby
func main() {
    print(str_upper(str_trim("  fubby  ")))
    print(math_sqrt(81))
    print(json_encode({"ok": true, "count": 3}))
}
```

Core helpers enforce argument validation and operation/size bounds. File
helpers are not an OS sandbox; do not run untrusted programs.

## Moon networking and SQLite

Moon HTTP calls require an explicit host allowlist configured in the
environment. With no allowlist, network requests are denied. The example below
uses a local test endpoint; it does not recommend allowing arbitrary hosts.

```fubby
func main() {
    let response = moon.http.get("http://127.0.0.1:18888/", {"timeout_ms": 2000, "max_bytes": 4096})
    print(response["status"])
    print(response["body"])

    let db = moon.db.sqlite.open("notes.db", {})
    db.execute("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT NOT NULL)", [])
    db.execute("INSERT INTO notes (title) VALUES (?1)", ["Local note"])
    print(db.query("SELECT id, title FROM notes WHERE title = ?1", ["Local note"]))
}
```

For a local-only HTTP test, run a trusted local endpoint on port 18888 and set
`FUBBY_NET_ALLOWLIST=127.0.0.1` for the Fubby process. HTTP methods currently
include `moon.http.get` and `moon.http.post`; their options include `headers`,
`timeout_ms`, and `max_bytes`. SQLite opens with
`moon.db.sqlite.open(path, options)`; handles provide `execute` and `query`.
Bind parameters rather than inserting untrusted values into SQL strings.
`moon.security.limits()` reports current Moon caps. Network access, timeouts,
response sizes, SQL operations, rows, and result sizes are bounded by runtime
controls, not an OS sandbox.

For example, start Python's standard-library test server in an empty temporary
directory (so it exposes no project data), then run the Fubby example with
the allowlist:

```sh
python3 -m http.server 18888 --bind 127.0.0.1
```

In another terminal, save the Fubby snippet as `moon-demo.fab` and run
`FUBBY_NET_ALLOWLIST=127.0.0.1 fubby run moon-demo.fab`. Stop the local fixture
with Ctrl-C when finished.

## Shady testing, formatting, linting, debugging, profiling

From a project directory, these commands are supported:

```sh
fubby shady test tests
fubby shady fmt --check src
fubby shady lint src
fubby shady debug src/main.fab
fubby shady profile src/main.fab
fubby shady docs src/main.fab --output api.md
```

Shady `debug` and `profile` execute the selected file and report bounded
observations. Use a non-server entrypoint for profiling; a Snow application
that registers routes requires Snow server context. `docs` writes to a new
output path and will not overwrite an existing file.

## Snow web application

This minimal app registers a page and a JSON endpoint:

```fubby
func main() {
    snow.get("/", "home")
    snow.get("/api/hello", "api_hello")
}

func home() {
    snow.html("<!doctype html><html><body><h1>Hello from Snow</h1></body></html>")
}

func api_hello() {
    snow.json({"message": "Hello from Fubby"})
}
```

Save as `app.fab`, then run locally:

```sh
fubby check app.fab
fubby snow serve app.fab --host 127.0.0.1 --port 8080 --workers 4 --queue-capacity 32 --shutdown-file /tmp/fubby-stop.marker
```

Visit `http://127.0.0.1:8080/`. From another terminal stop the server:

```sh
fubby snow stop /tmp/fubby-stop.marker
```

Snow also supports REST methods, static assets, request state, middleware,
response helpers, and bounded worker/queue resources. It has no TLS or
authentication and should remain on trusted local networks.

## Bela concurrency

This example spawns and joins a task, propagates its result, then communicates
through a bounded channel:

```fubby
func calculate() {
    let input = bela.input()
    bela.result(input["value"] * input["value"])
}

func main() {
    let task = bela.spawn("calculate", {"value": 12})
    print(bela.join(task))

    let channel = bela.channel(2)
    bela.send(channel, "ready")
    print(bela.recv(channel))
    bela.close(channel)
}
```

Task counts and worker/channel resources are bounded. Cancellation is
cooperative and cannot instantly interrupt every native operation.

## Smokey package management

Create a package project and add a local path dependency:

```sh
fubby pkg init greeting
fubby pkg init app
cd app
fubby pkg add greeting --path ../greeting
fubby pkg validate
fubby pkg install
fubby pkg list
```

A package manifest uses `manifest-version = 1`, a `[package]` table with
`name`, `version`, and `fubby` runtime constraint, plus optional
`[dependencies]`. A local path dependency can be declared like this:

```toml
manifest-version = 1

[package]
name = "app"
version = "0.1.0"
fubby = ">=0.1.0, <0.2.0"

[dependencies]
greeting = { version = "^0.1.0", path = "../greeting" }
```

After installation, Fubby writes `fubby.lock` and `.fubby/packages/`. Package
imports use `import "package:greeting/src/lib.fab"`. Smokey supports local path
dependencies and a local registry. It does not use a public network registry,
and hashes do not authenticate package publishers.

## Create and run the complete starter application

The archive contains `starter-project/`, a local multi-page notes application
with REST CRUD, SQLite, static assets, a reusable local package, Shady tests,
Snow routes, and Bela request-scoped work. After extracting the archive:

```sh
cp -R fubby-0.1.4-x86_64-apple-darwin/starter-project "$HOME/fubby-fieldnotes"
cd "$HOME/fubby-fieldnotes/app"
fubby pkg validate
fubby pkg install
fubby shady test tests/preview_tests.fab
fubby shady fmt --check src
fubby shady lint src
fubby snow serve src/main.fab --host 127.0.0.1 --port 8080 --workers 4 --queue-capacity 32 --shutdown-file /tmp/fubby-fieldnotes.stop
```

Open `http://127.0.0.1:8080/`, then stop from another terminal with
`fubby snow stop /tmp/fubby-fieldnotes.stop`. The app creates `preview.db`
and `.fubby/` under its app directory. Use a disposable copy for experiments.

## Security considerations and limitations

- **It isn't safe on the internet yet.** Snow has no login, sessions, or CSRF
  protection, the random numbers aren't secure, there's no sandbox, and there's been
  no security audit.
- Do not run untrusted Fubby source or packages.
- There is no OS-level sandbox or hard OS heap quota.
- Snow has no TLS or authentication/authorization; do not expose it to
  untrusted networks or use it as a production server.
- Resource limits and cancellation are runtime-level controls, not a security
  boundary against hostile code.
- SHA-256 sidecars are unsigned and do not authenticate the publisher.
- Binaries are not signed or notarized; independent build provenance is not
  provided.
- Smokey registries are local only; publisher authentication is absent.
- Apple Silicon and Linux ARM64 have no download yet. Linux x86-64 was tested on
  Ubuntu 24.04 only. Windows is a new beta, so expect some bugs and please report
  them.

## Troubleshooting and uninstall

If `fubby` is not found, ensure `$HOME/.local/bin` is on `PATH`. If the
executable reports a target mismatch, compare `fubby --version` with the
platform table above. On Linux, `GLIBC_2.34 not found` means your system is too
old for this build. Do not bypass macOS security prompts for untrusted artifacts.

The extracted bundle includes an optional archive-only smoke check:

```sh
python3 fubby-0.1.4-x86_64-apple-darwin/smoke_test.py \
  "$HOME/.local/bin/fubby" \
  fubby-0.1.4-x86_64-apple-darwin/starter-project
```

It uses a temporary copy of the starter project and a local loopback server.

To uninstall only the installed executable:

```sh
cd fubby-0.1.4-x86_64-apple-darwin
./uninstall.sh
```

For a custom install prefix, pass the same `--prefix "$HOME/tools"` to both
installer and uninstaller. The script removes `bin/fubby`, not user projects
or application data.

## License

Fubby is proprietary software. Copyright (c) 2026 Twig Software Solutions Pvt.
Ltd. This is a summary, and the [Fubby Software License](LICENSE.txt) is what applies.

- **You may** use Fubby for free for any purpose, including business. You own the
  programs you write, and can sell them. You may give unmodified copies to others
  and ship them with your apps.
- **You may not** sell Fubby itself, modify and redistribute it, offer it as a
  service for running other people's programs, or suggest that Twig endorses your
  work.
- **The examples** in `examples/` and the bundled starter project are under the
  [MIT license](examples/LICENSE).
- **Third-party components** stay under their own licenses, listed in
  [THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt).
- **The textbook** is all rights reserved.

Fubby comes with no warranty. The interpreter's source code isn't public.

## Version compatibility

The downloads are Fubby `0.1.4` for `x86_64-apple-darwin`,
`x86_64-unknown-linux-gnu`, and `x86_64-pc-windows-gnu`. Fubby is a 0.x preview;
syntax and APIs may change. The source build uses Rust 1.98.1 and a locked
dependency set, but binary users do not need Rust or Cargo. The packaged
starter includes `.fab` examples and a local path package. Minimum supported
macOS version and Apple Silicon behavior are not established. The Linux build
needs glibc 2.34 or later, and the Windows beta needs Windows 10 or later. No production compatibility or support guarantee
is made.
