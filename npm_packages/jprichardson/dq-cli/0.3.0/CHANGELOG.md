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