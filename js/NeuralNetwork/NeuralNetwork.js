class NeuralNetwork
{    
    constructor(numInputs, numOutputs, numHiddenLayers, numNeuronsPerHiddenLayer) 
    {

        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.numHiddenLayers = numHiddenLayers;
        this.numNeuronsPerHiddenLayer = numNeuronsPerHiddenLayer;

        this.bias = -1.0;
        this.activationResponse = 1.0;
        this.neuronLayers = [];

        this.createNetwork();
    }
		
    createNetwork()	
    {

		//create the layers of the network
		if (this.numHiddenLayers > 0)
		{
			//create first hidden layer
			var firstHiddenLayer = new NeuronLayer(this.numNeuronsPerHiddenLayer, this.numInputs);
			this.neuronLayers.push(firstHiddenLayer);
	    
		    for (var i=0; i<this.numHiddenLayers-1; ++i)
		    {
		    	var newHiddenLayer = new NeuronLayer(this.numNeuronsPerHiddenLayer, this.numNeuronsPerHiddenLayer);
				this.neuronLayers.push(newHiddenLayer);
		    }
	
		    //create output layer
		    var outputLayer = new NeuronLayer(this.numOutputs, this.numNeuronsPerHiddenLayer);
			this.neuronLayers.push(outputLayer);
		}
		else
		{
			//create output layer
			var outputLayer = new NeuronLayer(this.numOutputs, this.numInputs);
			this.neuronLayers.push(outputLayer);
		}
	}
	
	update(inputs)
	{
		
		var outputs = [];
		
		var cWeight = 0;
		
		// If the number of inputs supplied is incorrect...
		if (inputs.length!=this.numInputs)
		{
			return outputs; // Return empty outputs
		}
		
		// Loop through all layers
		var inputLayer = true;
		for (var i=0; i < this.numHiddenLayers + 1; ++i)
		{
			var neuronLayer = this.neuronLayers[i];
			
			if (!inputLayer)
			{
				inputs = [];
				inputs = inputs.concat(outputs);
			}
			else
			{
				inputLayer = false;
			}
			
			outputs = [];
			
			cWeight = 0;
			
			// For each neuron sum the (inputs * corresponding weights).
			// Throw the total at our sigmoid function to get the output.
			for (var j=0; j < neuronLayer.neurons.length; ++j)
			{
				var neuron = neuronLayer.neurons[j];
				
				var totalInput = 0;
				
				// For each weight...
				for (var k=0; k < neuron.numInputs - 1; ++k)
				{
					// Multiply it with the input.
					totalInput += neuron.weights[k] * 
							inputs[cWeight];
					
					cWeight++;
				}
				
				// Add in the bias (final weight)
				totalInput += neuron.weights[neuron.weights.length-1] * this.bias;
				
				// We can store the outputs from each layer as we generate them.
			    // The combined activation is first filtered through the sigmoid function
				outputs.push(this.sigmoid(totalInput, this.activationResponse));
				
				cWeight = 0;
			}
		}
		
		return outputs;
	}

	sigmoid(totalInput, activationResponse)
	{
		return ( 1 / ( 1 + Math.exp(-totalInput / activationResponse)));
	}
	
	getWeights()
	{
		var weights = [];
		
		//for each layer
		for (var i=0; i<this.numHiddenLayers + 1; ++i)
		{

			//for each neuron
			for (var j=0; j<this.neuronLayers[i].neurons.length; ++j)
			{
				//for each weight
				for (var k=0; k<this.neuronLayers[i].neurons[j].numInputs; ++k)
				{
					weights.push(this.neuronLayers[i].neurons[j].weights[k]);
				}
			}
		}

		return weights;
	}
	
	setWeights(weights)
	{
		var cWeight = 0;
		
		//for each layer
		for (var i=0; i<this.numHiddenLayers + 1; ++i)
		{

			//for each neuron
			for (var j=0; j<this.neuronLayers[i].neurons.length; ++j)
			{
				//for each weight
				for (var k=0; k<this.neuronLayers[i].neurons[j].numInputs; ++k)
				{
					this.neuronLayers[i].neurons[j].weights[k] = weights[cWeight++];
				}
			}
		}
	}
}
