// Данные: персонажи и связи с координатами
const characters = [
  { 
    id: "corvo", 
    name: "Корво Аттано", 
    url: "src/characters/corvo/corvo.html", 
    x: 300, y: 70,
    image: "src/characters/corvo/images/corvo_portrait.jpg" 
  },
  { id: "emily", 
    name: "Эмили Колдуин", 
    url: "src/characters/emily/emily.html", 
    x: 500, 
    y: 150,
    image: "src/characters/emily/images/Emily.jpg" 
  },
  { id: "jessamine", 
    name: "Джессамина Колдуин", 
    url: "src/characters/jessamine/jessamine.html", 
    x: 400, y: 300,
    image: "src/characters/jessamine/images/Jessamine.jpg" 
  },
  { 
    id: "burrows", 
    name: "Хайрем Борроуз", 
    url: "src/characters/burrows/burrows.html", 
    x: 550, 
    y: 300,
    image: "src/characters/burrows/images/Burrows.jpg" 
   },
  { 
    id: "daud", 
    name: "Дауд", 
    url: "src/characters/daud/daud.html", 
    x: 200, 
    y: 350,
    image: "src/characters/daud/images/Daud.jpg" 
  }
];

const relationships = [
  { source: "corvo", target: "emily", type: "хранитель" },
  { source: "corvo", target: "jessamine", type: "возлюбленная" },
  { source: "burrows", target: "jessamine", type: "убийца" },
  { source: "daud", target: "jessamine", type: "наёмник" },
  { source: "daud", target: "corvo", type: "соперник" }
];

// Формируем элементы для Cytoscape
const elements = [];

// Узлы с позициями
characters.forEach(char => {
  elements.push({
    data: { id: char.id, label: char.name, url: char.url, image: char.image },
    position: { x: char.x, y: char.y },
    // 🔒 Запрещаем перетаскивание
    grabbable: false
  });
});

// Рёбра
relationships.forEach(rel => {
  elements.push({
    data: { source: rel.source, target: rel.target, label: rel.type }
  });
});

// Инициализация графа
document.addEventListener('DOMContentLoaded', () => {
  const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          'background-image': 'data(image)',
          'background-fit': 'cover',
          'label': 'data(label)',
          'color': '#fff',
          'text-valign': 'center',
          'text-halign': 'center',
          'width': 60,
          'height': 60,
          'font-size': 6,
          'border-width': 2,
          'border-color': '#2980b9',
          'shape': 'ellipse'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#95a5a6',
          'target-arrow-color': '#95a5a6',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'text-background-color': '#000',
          'text-background-opacity': 0.7,
          'text-background-shape': 'rectangle',
          'color': '#ecf0f1',
          'font-size': 10
        }
      },
      {
        selector: 'node:hover',
        style: {
          'background-color': '#e74c3c',
          'cursor': 'pointer'
        }
      }
    ],
    layout: {
      name: 'preset', // ⚠️ Используем preset — размещает по position
      fit: true,
      padding: 30
    },
    // 🔒 Глобально отключаем перетаскивание (на всякий случай)
    userPanningEnabled: true,
    userZoomingEnabled: true, // можно оставить масштабирование
    boxSelectionEnabled: false,
    autounselectify: true
  });

  // Обработка клика по узлу
  cy.on('tap', 'node', function (evt) {
    const node = evt.target;
    const url = node.data('url');
    if (url) {
      window.location.href = url;
    }
  });
});