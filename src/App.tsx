import NavBar from './components/navbar';
import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import { SlidersHorizontal } from 'lucide-react';
import './App.css'
import CategorySelector from "./components/CategorySelector";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuns, setSelectedGuns] = useState<string[]>([]);
  const [selectedArmor, setSelectedArmor] = useState<string[]>([]);
  const [selectedHelmets, setSelectedHelmets] = useState<string[]>([]);
  const [selectedRigs, setSelectedRigs] = useState<string[]>([]);
  const [selectedBags, setSelectedBags] = useState<string[]>([]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);


  return (
    <>
      <NavBar/>
      {/* Centered Button with Customization Icon */}
      <div className="flex items-center justify-center min-h-screen gap-4">
        <Button variant='unstyled'
          className="px-6 py-3 text-lg font-semibold bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Generate
        </Button>

        {/* Customization Button */}
        <Button
          onClick={toggleModal}
          variant="outline"
          className="p-3 rounded-full border border-gray-400 hover:bg-gray-200"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Customization Modal */}
      <Modal
        opened={isModalOpen} onClose={toggleModal} title="Customization Options" centered>
        <div className="space-y-4">

          {/* Gun Categories Dropdown */}
          <CategorySelector 
            title="Guns"
            items={["Assault Rifles", "Sniper Rifles", "SMGs", "Shotguns", "Pistols"]}
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
    </>
  )
}

export default App
