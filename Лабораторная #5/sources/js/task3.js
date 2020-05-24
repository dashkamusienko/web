function calc(harsh)
{
	let sum = 0;
	let num = harsh;
	while (harsh >= 1)
	{
		sum += harsh%10;
		harsh = Math.trunc(harsh/10);
	}
	console.log(num);
	console.log(sum);
	console.log((num % sum == 0) ? "Yes" : "No");
	return (num % sum == 0) ? 'Yes' : 'No';
}

function getRes()
{
  document.getElementById('out').innerHTML = calc(parseInt(document.getElementById('in').value));
}