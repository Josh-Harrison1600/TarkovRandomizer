import NavBar from './components/navbar';
import { useEffect, useState, useRef } from 'react';
import { Modal, Button } from '@mantine/core';
import { SlidersHorizontal } from 'lucide-react';
import fetchAPIData from './components/callAPI';
import './App.css'
import CategorySelector from "./components/CategorySelector";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuns, setSelectedGuns] = useState<string[]>(["Assault Rifles", "Assault Carbines", "Bolt-Action", "SMGs", "LMGs", "Shotguns", "Pistols", "Revolvers"]);
  const [selectedArmor, setSelectedArmor] = useState<string[]>(["Enabled"]);
  const [selectedHelmets, setSelectedHelmets] = useState<string[]>(["armored"]);
  const [selectedRigs, setSelectedRigs] = useState<string[]>(["Unarmored Rigs"]);
  const [selectedBags, setSelectedBags] = useState<string[]>(["Enabled"]);
  const [data, setData] = useState<{ [key: string]: { id: number; name: string; category: string }[] }>({});
  const [randomLoadout, setRandomLoadout] = useState<{ [key: string]: string | null }>({});
  const hasFetched = useRef(false);//prevents multiple calls of the API
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  
  useEffect(() => {
    if(hasFetched.current) return;
    hasFetched.current = true;
    const categories = ["guns", "helmets", "armor", "rigs", "backpacks"];

    //fetch api data
    const fetchAllData = async () => {
      const results = await Promise.all(
        categories.map(async (category) => {
          const response = await fetchAPIData(category);
          return { [category]: response[category]};
        })
      );
      setData(Object.assign({}, ...results)); 
    };
    fetchAllData();
  }, []);

  //function to get random item from array
  const getRandomItem = (items: { id: number; name: string; category: string; }[]) => {
    if(items.length === 0) return null;
    return items[Math.floor(Math.random() * items.length)].name;
  };

  //function to generate random loadout
  const generateLoadout = () => {
    const newLoadout: { [key: string]: string | null } = {};

    //filter items based on the users selection
    const filterBySelection = (items: { id: number, name: string, category: string;}[], selectedCategories: string[]) => {
      return items.filter(item => selectedCategories.includes(item.category));
    };

    if (selectedGuns.length > 0) {
      const filteredGuns = filterBySelection(data.guns || [], selectedGuns)
      newLoadout["Gun"] = getRandomItem(filteredGuns);
    }
    if (selectedHelmets.length > 0) {
      const filteredHelmets = filterBySelection(data.helmets || [], selectedHelmets);
      newLoadout["Helmet"] = getRandomItem(filteredHelmets);
    }
  
    if (selectedArmor.length > 0) {
      newLoadout["Armor"] = getRandomItem(data.armor || []);
    }
  
    if (selectedRigs.length > 0) {
      const filteredRigs = filterBySelection(data.rigs || [], selectedRigs);
      newLoadout["Rig"] = getRandomItem(filteredRigs);
    }
  
    if (selectedBags.length > 0) {
      newLoadout["Backpack"] = getRandomItem(data.backpacks || []);
    }
  
    setRandomLoadout(newLoadout);
  };


  return (
    <>
    <div className='bg-[#f1f5f0] min-h-screen'>
      <NavBar/>
      {/* Centered Button with Customization Icon */}
      <div className="flex flex-col items-center justify-start gap-6 mt-10">

        {/* Customization/Genrate Button */}
        <div className='flex items-center justify-center gap-4'>
          <Button variant='outline'
            className="px-6 py-3 text-lg font-semibold rounded-lg"
            onClick={generateLoadout}
            color="black"
          >
            Generate
          </Button>

          <Button
            onClick={toggleModal}
            variant="outline"
            color="black"
            className="p-3 rounded-full border border-gray-400 hover:bg-gray-200"
          >
            <SlidersHorizontal className="w-6 h-6" color="black" />
          </Button>
        </div>

        {/* display loadout when generated */}
        <div className='flex flex-grow items-center justify-center w-full mb-80'>
        {Object.keys(randomLoadout).length > 0 && (
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-black mb-8'>Generated Loadout:</h2>
            <ul className='mt-2 text-lg'>
              {Object.entries(randomLoadout).map(([category, item]) => (
                <li key={category} className='mt-1'>{category}: {item || "none"}</li>
              ))}
            </ul>
          </div>
          
        )}
        </div>
      </div>

      {/* Customization Modal */}
      <Modal
        opened={isModalOpen} onClose={toggleModal} title="Customization Options" centered>
        <div className="space-y-4">

          {/* Gun Categories Dropdown */}
          <CategorySelector 
            title="Guns"
            items={["Assault Rifles", "Assault Carbines", "Bolt-Action", "SMGs", "LMGs", "Shotguns", "Pistols", "Revolvers"]}
            selectedItems={selectedGuns}
            setSelectedItems={setSelectedGuns}
          />

          {/* Helmet Categories Dropdown */}
          <CategorySelector 
            title="Helmets"
            items={["Hats"]}
            selectedItems={selectedHelmets}
            setSelectedItems={setSelectedHelmets}
          />

          {/* Armor Categories Dropdown */}
          <CategorySelector 
            title="Armor"
            items={["Enabled"]}
            selectedItems={selectedArmor}
            setSelectedItems={setSelectedArmor}
          />

          {/* Rigs Categories Dropdown */}
          <CategorySelector 
            title="Rigs"
            items={["Armored Rigs", "Unarmored Rigs"]}
            selectedItems={selectedRigs}
            setSelectedItems={setSelectedRigs}
          />

          {/* Bags Categories Dropdown */}
          <CategorySelector 
            title="Bags"
            items={["Enabled"]}
            selectedItems={selectedBags}
            setSelectedItems={setSelectedBags}
          />
          <div>
          </div>
        </div>
      </Modal>
      </div>
    </>
  )
}

export default App
