class Neuron
{
	constructor(numInputs)
	{
        this.weights = [];
		this.numInputs = numInputs;
				
		for (var i=0; i<numInputs+1; ++i)
		{
			var newWeight = -1 + (Math.random()*2);
			
			this.weights.push(newWeight);
		}
	}
}
