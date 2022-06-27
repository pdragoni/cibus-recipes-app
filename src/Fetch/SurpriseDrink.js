const surpriseDrink = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const responseJson = await response.json();
  console.log(responseJson);
};

export default surpriseDrink;
