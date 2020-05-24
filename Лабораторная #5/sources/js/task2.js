function calc(string)
{
  dist = new Array(string.length).fill(Infinity);
  let iCount = NaN, jCount = NaN;
  for (let i = 0, j = string.length - 1; string.length > i || j > 0; i++ , j--)
  {
    isVowel(string.charAt(i)) ? iCount = 0 : iCount++;
    isVowel(string.charAt(j)) ? jCount = 0 : jCount++;
    if (iCount != NaN && dist[i] > iCount)
      dist[i] = iCount;
    if (jCount != NaN && dist[j] > jCount)
      dist[j] = jCount;
  }
  return dist;
}

function isVowel(ch)
{
  return ['a', 'e', 'i', 'o', 'u'].indexOf(ch.toLowerCase()) !== -1;
}


function getRes()
{
  document.getElementById('out').innerHTML = calc(document.getElementById('in').value);
}