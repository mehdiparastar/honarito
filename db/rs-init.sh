#!/bin/bash

mongo --host db1:27017<<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "db1:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "db2:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "db3:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF