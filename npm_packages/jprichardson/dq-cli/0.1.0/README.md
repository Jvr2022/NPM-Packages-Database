dq-cli
======

Command line tools to interface with Redis priority queues created by [dq](https://github.com/jprichardson/node-dq).


Install
-------

    npm install --g dq-cli



Usage
-----

### dq-import


    Usage: dq-import [options]

    Options:

      -h, --help                  output usage information
      -V, --version               output the version number
      -h, --host [host]           host of redis server, the default is localhost
      -a, --auth [password]       password of redis server
      -p, --port [number]         port of redis server, the default is 6379
      -q, --queue [queueName]     name of the queue
      -s, --shuffle               insert in random order



**Examples:**

    $ cat my_data_set.txt | dq-import --queue mydataset

or..

    $ dq-import --queue mydataset --file my_data_set.txt


### dq-export


    Usage: dq-export [options]

    Options:

      -h, --help                  output usage information
      -V, --version               output the version number
      -h, --host [host]           host of redis server, the default is localhost
      -a, --auth [password]       password of redis server
      -p, --port [number]         port of redis server, the default is 6379
      -q, --queue [queueName]     name of the queue



**Examples:**

    $ dq-export --queue mydataset > my_data_set.txt

or..

    $ dq-export --queue mydataset --file my_data_set.txt



License
-------

MIT

