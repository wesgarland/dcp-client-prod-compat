/**
 * Helper function to instantiate a standalone node worker.
 * 
 * @author Robert Mirandola, <robert@distributive.network>
 * 
 * @date May 2023
 * 
 * @param {object|undefined}    config      (optional) Unique configs to be leaf merged with the default configs
 * 
 * @returns SA worker.
 */
exports.createWorker = async function createWorker(config) 
{
  const wallet = require('dcp/wallet');
  const { Worker } = require('dcp/worker');
  const { leafMerge } = require('dcp/utils');
  // Config host name and port number for worker connection to evaluator
  const sawOptions = {
    hostname: dcpConfig.evaluator.location.hostname,
    port: Number(dcpConfig.evaluator.location.port),
  }
  // Config options property to be passed into the worker constructor
  const options = {
    paymentAddress: (await wallet.get()).address,
    cores: { cpu: 1 },
    sandboxOptions: {
      SandboxConstructor: require('dcp-client/lib/standaloneWorker').workerFactory(sawOptions)
    },
    computeGroups: [],
    leavePublicGroup: false,
    // Make sure the worker is only allowed to work on the job addresses that we specify
    jobAddresses: [],
  };
  
  // leafMerge the configs supplied with the options object supplied to the worker.
  let workerOptions;
  if (config)
    workerOptions = leafMerge(options, config);
  else
    workerOptions = options;

  const identityKeystore = await wallet.getId();
  
  return new Worker(identityKeystore, workerOptions); 
}
