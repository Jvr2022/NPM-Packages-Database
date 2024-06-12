0.9.0 / 2015-07-28
------------------
- removed `terst` for `assert`
- made tests working in Trinity
- upgraded `dq` from `0.8.x` to `0.9.x` (add count to `deq`)
- `dq-export` now exports much qucker (uses count to pass to `deq`)

0.8.0 / 2015-06-23
------------------
- upgraded `dq` to `0.8.x` for io.js support

0.7.0 / 2015-04-21
------------------
- upgraded `dq` to `0.7.x`, (can now set `name` and `key` is implicitly updated)
- `dq-list` now includes the counts

0.6.0 / 2015-03-22
------------------
- `dq-view` was too slow, optimized
- added `dq-delete`

0.5.0 / 2015-03-22
------------------
- added `dq-list`

0.4.0 / 2015-03-22
------------------
- changed command line option `-q, --queue` to `-n, --name`
- added `dq-config`, added option `-c, --config` to each cli tool

0.3.0 / 2015-03-22
------------------
- added `dq-count`
- changed `dq-import` when `--shuffle` is not passed, it normalizes priority from `0` to `1`, whereas before it
would just set the priority equal to the line number. This change is useful if you want to keep adding to the
priority queue.
- added `dq-view`

0.2.0 / 2015-03-21
------------------
- updated `dq` from `0.4.0` to `0.5.0`

0.1.0 / 2015-03-20
------------------
- initial release, removed from https://github.com/jprichardson/node-dq
