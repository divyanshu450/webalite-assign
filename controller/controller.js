const fs = require('fs');
// Load data from the JSON file
const dataFile = 'items.json';
const loadData = () => JSON.parse(fs.readFileSync(dataFile));

const getCollection = async(req, res)=>{
    try {
        const items = loadData();
        // Implement pagination, filtering, and sorting here based on query parameters
        res.json(items);
    } catch (error) {
        console.log(error);
        res.send({data: null, error: error, message: "Internal Server Error", code: 501})
    }
}


const postCollection = async(req, res)=>{
    try {
        const items = loadData();
  const newItem = req.body;
  items.push(newItem);
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  res.send({data: newItem, error: null, message: "created", code: 201});
        
    } catch (error) {
        console.log(error);
        res.send({data: null, error: error, message: "Internal Server Error", code: 501})
    }
}


const updateCollection = async(req, res)=>{
    try {
        const items = loadData();
        console.log(req.params.name)
  const itemId = req.params.name;
  const updatedItem = req.body;

  // Find the index of the item to update
  const itemIndex = items.findIndex((item) => item.name === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Update the item
  items[itemIndex] = { ...items[itemIndex], ...updatedItem };
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  res.send({data: items[itemIndex], error: null, message: "updated", code: 200});
    } catch (error) {
        console.log(error);
        res.send({data: null, error: error, message: "Internal Server Error", code: 501})
    }
}


const deleteCollection = async(req, res)=>{
    try {
        const items = loadData();
  const itemId = req.params.name;
        console.log(itemId)
  // Find the index of the item to delete
  const itemIndex = items.findIndex((item) => item.name === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Remove the item from the array
  const deletedItem = items.splice(itemIndex, 1)[0];
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  res.send({data: deletedItem, error: null, message: "deleted", code: 200});
    } catch (error) {
        console.log(error);
        res.send({data: null, error: error, message: "Internal Server Error", code: 501})
    }
}

module.exports = {getCollection, updateCollection, deleteCollection, postCollection}