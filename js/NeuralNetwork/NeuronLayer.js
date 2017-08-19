class NeuronLayer
{
	constructor(numNeuronsPerHiddenLayer, numInputs)
	{
        this.neurons = [];

		for (var i = 0; i < numNeuronsPerHiddenLayer; ++i)
		{
			var newNeuron = new Neuron(numInputs);
			
			this.neurons.push(newNeuron);
		}
	}
}
