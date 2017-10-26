# Simple Neural Network library (JavaScript)

The point of this library is to allow very simple neural networks to be easily created, with no extra fluff.

## Installation

This library can be easily installed with yarn or npm. The installation commands is as follows.

```bash
npm install simple-neural-network-js # Install with NPM
yarn add simple-neural-network-js    # Install with yarn
```

## Usage

### Creating a neural network

You can create a new neural network with the following command.

```js
var numInputs = 2;
var numOutputs = 2;
var numHiddenLayers = 2;
var numNeuronsPerHiddenLayer = 6;

var neuralNetwork = new NeuralNetwork(numInputs, numOutputs, numHiddenLayers, numNeuronsPerHiddenLayer);
```

The `NeuralNetwork` constructor accepts parameters that defined the number of inputs and outputs the neural 
network should have, the number of hidden layers that should exist and the number of neurons that should be 
present in each hidden layer.

### Using the neural network

To get outputs from the neural network, you must supply it with an array of inputs. This array's length should be
equal to the number of inputs you set when creating the neural network.

Ideally the inputs should be in a range from -1 to +1, but this is not required.

Outputs are returned as an array of values from 0 to +1.

The `update` method is used to supply inputs to the neural network and retrieve outputs. An example usage is 
shown below.

```js
var inputs = [0.12, 0.24];
var outputs = neuralNetwork.update(inputs);
```

## Getting and setting weights

The weights between the neurons be retrieved or overrided with the `getWeights` and `setWeights` methods. Examples
of how to use these methods are shown below.

```js
var weights = neuralNetwork.getWeights();

var newWeights = [];
for (var i=0; i < weights.length; i++) {
    newWeights.push(weights[i] * 0.5); 
}

neuralNetwork.setWeights(newWeights);
```

Weights are returned by the `getWeights` as a single dimension array.

New weights must be provided to the `setWeights` method in the same order as they are retrieved by the `getWeights` method.
