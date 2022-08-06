//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', doTheyEgg)

function doTheyEgg(){
  const pokemon1 = document.querySelector('#pokemon-1').value.toLowerCase()
  const pokemon1url = 'https://pokeapi.co/api/v2/pokemon-species/'+pokemon1
  const pokemon1Sprite = 'https://pokeapi.co/api/v2/pokemon/'+pokemon1

  const pokemon2 = document.querySelector('#pokemon-2').value.toLowerCase()
  const pokemon2url = 'https://pokeapi.co/api/v2/pokemon-species/'+pokemon2
  const pokemon2Sprite = 'https://pokeapi.co/api/v2/pokemon/'+pokemon2


  Promise.all([
    fetch(pokemon1url),
    fetch(pokemon1Sprite),
    fetch(pokemon2url),
    fetch(pokemon2Sprite)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    // You would do something with both sets of data here
    console.log(data);

    let pokemon1EggGroup = []
    data[0].egg_groups.forEach(x=>pokemon1EggGroup.push(x.name))
    console.log(pokemon1EggGroup)
    document.querySelector('.pokemon-1-name').innerText = data[0].names[8].name
    document.querySelector('.pokemon-1-sprite').src = data[1].sprites.front_default
    document.querySelector('.pokemon-1-group').innerText = `Egg Group: ${pokemon1EggGroup.join(', ')}`


    let pokemon2EggGroup = []
    data[2].egg_groups.forEach(x=>pokemon2EggGroup.push(x.name))
    console.log(pokemon2EggGroup)
    document.querySelector('.pokemon-2-name').innerText = data[2].names[8].name
    document.querySelector('.pokemon-2-sprite').src = data[3].sprites.front_default
    document.querySelector('.pokemon-2-group').innerText = `Egg Group: ${pokemon2EggGroup.join(', ')}`

    let matchingEggGroup = []
    for(let i=0;i<pokemon1EggGroup.length;i++){
      for(let j=0;j<pokemon2EggGroup.length;j++){
        if (pokemon1EggGroup[i]===pokemon2EggGroup[j]){
          matchingEggGroup = pokemon2EggGroup[j]
        }
        if (matchingEggGroup.length > 0){
          document.querySelector('.egg-results').innerText = 'We have a match!'
        } else {
          document.querySelector('.egg-results').innerText = "The chemistry isn't quite there!"
        }
      }
    }

    //add something for when input is wrong
    //add alt text on button press

  })  
  .catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
}

//   fetch(pokemon1url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         let pokemon1EggGroup = []
//         data.egg_groups.forEach(x=>pokemon1EggGroup.push(x.name))
//         console.log(pokemon1EggGroup)
//       })


//       .catch(err => {
//           console.log(`error ${err}`)
//       });

//   fetch(pokemon2url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         let pokemon2EggGroup = []
//         data.egg_groups.forEach(x=>pokemon2EggGroup.push(x.name))
//         console.log(pokemon2EggGroup)      
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });

//       console.log(pokemon1EggGroup)
// }

