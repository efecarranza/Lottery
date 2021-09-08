const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const infura_endpoint = 'https://rinkeby.infura.io/v3/d509fb5c95c04ae49799a35691d3d7bc';

const provider = new HDWalletProvider(
    'my secret seed',
    infura_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ gas: '5000000', from: accounts[0] });

    console.log(interface);
    console.log('contract deployed to: ', result.options.address);
};

deploy();

