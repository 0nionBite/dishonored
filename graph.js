// Данные: персонажи и связи с координатами
const characters = [
  { id: "corvo", name: "Corvo Attano", url: "characters/corvo/corvo.html", x: 300, y: 200 },
  { id: "emily", name: "Emily Kaldwin", url: "characters/emily/emily.html", x: 500, y: 150 },
  { id: "jessamine", name: "Jessamine Kaldwin", url: "characters/jessamine/jessamine.html", x: 400, y: 300 },
  { id: "burrows", name: "Hiram Burrows", url: "characters/burrows/burrows.html", x: 150, y: 100 },
  { id: "daud", name: "Daud", url: "characters/daud/daud.html", x: 200, y: 350 }
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
    data: { id: char.id, label: char.name, url: char.url },
    position: { x: char.x, y: char.y },
    // 🔒 Запрещаем перетаскивание
    grabbable: true
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
          'background-color': '#3498db',
          'label': 'data(label)',
          'color': '#fff',
          'text-valign': 'center',
          'text-halign': 'center',
          'width': 60,
          'height': 60,
          'font-size': 12,
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
    userPanningEnabled: false,
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