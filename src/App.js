import React, { useState } from "react";

const productDB = {
  bread: { "Pick n Pay": 20, Checkers: 19, Woolworths: 25, Spar: 22 },
  milk: { "Pick n Pay": 30, Checkers: 28, Woolworths: 35, Spar: 29 },
  rice: { "Pick n Pay": 50, Checkers: 52, Woolworths: 60, Spar: 55 },
  eggs: { "Pick n Pay": 40, Checkers: 38, Woolworths: 45, Spar: 42 },
  sugar: { "Pick n Pay": 25, Checkers: 27, Woolworths: 30, Spar: 26 },
  cheese: { "Pick n Pay": 60, Checkers: 58, Woolworths: 70, Spar: 65 },
  chicken: { "Pick n Pay": 120, Checkers: 115, Woolworths: 135, Spar: 125 },
  apples: { "Pick n Pay": 35, Checkers: 33, Woolworths: 40, Spar: 36 },
  coffee: { "Pick n Pay": 80, Checkers: 78, Woolworths: 90, Spar: 85 },
  oil: { "Pick n Pay": 55, Checkers: 53, Woolworths: 65, Spar: 58 },
};

function App() {
  const [items, setItems] = useState([""]);
  const [results, setResults] = useState(null);
  const [expanded, setExpanded] = useState({});

  const addItem = () => setItems([...items, ""]);
  const updateItem = (i, value) => {
    const newItems = [...items];
    newItems[i] = value;
    setItems(newItems);
  };

  const comparePrices = () => {
    const totals = { "Pick n Pay": 0, Checkers: 0, Woolworths: 0, Spar: 0 };
    const breakdown = { "Pick n Pay": {}, Checkers: {}, Woolworths: {}, Spar: {} };

    items.forEach((item) => {
      const key = item.toLowerCase();
      if (productDB[key]) {
        Object.keys(productDB[key]).forEach((store) => {
          totals[store] += productDB[key][store];
          breakdown[store][key] = productDB[key][store];
        });
      }
    });

    setResults({ totals, breakdown });
  };

  const cheapestStore =
    results &&
    Object.entries(results.totals).reduce((a, b) => (a[1] < b[1] ? a : b))[0];

  const toggleExpand = (store) => {
    setExpanded((prev) => ({ ...prev, [store]: !prev[store] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        SmartCart – AI Shopping Saver
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Enter Your Shopping List</h2>
        {items.map((item, i) => (
          <input
            key={i}
            value={item}
            placeholder={\`Item \${i + 1}\`}
            onChange={(e) => updateItem(i, e.target.value)}
            className="border rounded p-2 w-full mb-2"
          />
        ))}
        <button
          onClick={addItem}
          className="w-full border rounded p-2 bg-gray-100"
        >
          + Add Item
        </button>
        <button
          onClick={comparePrices}
          className="w-full border rounded p-2 bg-green-600 text-white"
        >
          Compare Prices
        </button>
      </div>

      {results && (
        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-6">
          {Object.keys(results.totals).map((store) => (
            <div key={store} className="bg-white shadow p-4 rounded-lg">
              <h3 className="text-lg font-bold">{store}</h3>
              <p>Total: R{results.totals[store].toFixed(2)}</p>
              <button
                onClick={() => toggleExpand(store)}
                className="text-blue-600 text-sm mt-2"
              >
                {expanded[store] ? "Hide Breakdown" : "View Breakdown"}
              </button>
              {expanded[store] && (
                <div className="mt-2 text-sm">
                  {Object.entries(results.breakdown[store]).map(([item, price]) => (
                    <p key={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}: R{price}
                    </p>
                  ))}
                </div>
              )}
              {store === cheapestStore && (
                <p className="mt-2 text-green-600 font-semibold">
                  ✅ Cheapest Option
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
