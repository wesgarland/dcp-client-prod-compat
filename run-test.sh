#! /bin/bash

echo "Please ensure the DCP system at `node -e "require('dcp-client').init().then(() => console.log(dcpConfig.scheduler.location.href))"` has a running scheduler on your new code"
echo "and that there is a working evaluator on your system"
echo

export DCP_DEBUG=${DCP_DEBUG:-all:all}
node ./deploy-and-run-simple-job.simple
