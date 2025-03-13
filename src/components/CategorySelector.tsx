import { Accordion, Checkbox } from "@mantine/core";

interface CategorySelectorProps {
    title: string;
    items: string[];
    selectedItems: string[];
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ title, items, selectedItems, setSelectedItems }) => {
    const handleSelection = (item: string) => {
      setSelectedItems((prev: string[]) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };
    
    return (
        <Accordion>
        <Accordion.Item value={title.toLowerCase()}>
          <Accordion.Control>{title}</Accordion.Control>
          <Accordion.Panel>
            <div className="space-y-2">
              {items.map((item) => (
                <Checkbox
                  key={item}
                  label={item}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleSelection(item)}
                  color="black"
                />
              ))}
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
};

export default CategorySelector;
