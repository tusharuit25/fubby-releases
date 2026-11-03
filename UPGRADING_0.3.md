# Upgrading from Fubby 0.2 to 0.3

0.3 doesn't change the language: programs written for 0.2 run unchanged. One edit is
needed for packages, and a few Snow defaults changed.

## Update your package manifests

Fubby refuses a package whose `fubby` range leaves it out. Packages made with 0.2 say:

```toml
fubby = ">=0.2.0, <0.3.0"
```

Change that line in each `fubby.toml` to:

```toml
fubby = ">=0.3.0, <0.4.0"
```

`fubby init` already writes the new range.

## Snow's new defaults

- **Security headers.** Every response now has `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Cross-Origin-Opener-Policy:
  same-origin`, and `Content-Security-Policy: frame-ancestors 'none'; object-src 'none';
  base-uri 'self'`. They don't restrict your scripts or styles. A page that other sites
  must show in a frame needs `snow.header_remove("x-frame-options")` and its own
  `Content-Security-Policy`. A header you set replaces Snow's.
- **Cookies.** Setting `set-cookie` twice with `snow.header` now sends two cookies, where
  0.2 kept only the last. Use `snow.set_cookie`, which has safe defaults. A response that
  sets a cookie gets `Cache-Control: no-store` unless you set your own.
- **HEAD requests** are now answered by the GET route, without the body. 0.2 answered
  them with 405.
- **Forwarded headers.** Snow ignores `X-Forwarded-For`, `-Proto` and `-Host` unless
  `--trust-proxy` names the proxy that sends them. Use `snow.request()["client_ip"]` and
  `["scheme"]` instead of reading those headers yourself.
- **Requests** have new keys: `cookies`, `client_ip`, `scheme`, `host` and `id`.
- **Options.** `--workers` now goes up to 32 and `--queue-capacity` up to 1,024.
  `--quiet` and the new `--access-log` can't be used together.

## What's new

Sessions, CSRF protection, cookies, forms, uploads, JSON access logs, a health path, and
SIGTERM shutdown are in Snow. `moon.security.password_hash` hashes passwords with
argon2id. `DEPLOYMENT.md` puts a Snow app on a Linux server behind nginx or Caddy.
Strings are shared instead of copied, which makes maps about 30% faster.
