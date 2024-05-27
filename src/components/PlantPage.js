import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then( r => r.json())
    .then( plantsInDb => setPlants(plantsInDb) )
    .catch(error => console.error(error))
  }, [])

  function handleNewPlant(newPlantObj) {
    setPlants([...plants, newPlantObj])
  }

  const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main>
      <NewPlantForm onFormSubmit={handleNewPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants}/>
    </main>
  );
}

export default PlantPage;
