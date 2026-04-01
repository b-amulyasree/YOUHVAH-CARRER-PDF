// INIT GRAPH
const Graph = ForceGraph3D()(document.getElementById('graph'))

// ENABLE CONTROLS (FIXED ZOOM)
Graph.enableNodeDrag(true)
Graph.enableNavigationControls(true)

/* DATA (you can expand later to 1000 jobs) */
const data = {
  nodes: [
    { id: "CAREERS", group: 0 },

    { id: "Tech", group: 1 },
    { id: "Finance", group: 1 },
    { id: "Medical", group: 1 },
    { id: "Law", group: 1 },
    { id: "Engineering", group: 1 },

    { id: "Software Engineer", group: 2 },
    { id: "AI Engineer", group: 2 },
    { id: "Cloud Architect", group: 2 },

    { id: "Investment Banker", group: 3 },
    { id: "Quant Trader", group: 3 },

    { id: "Surgeon", group: 4 },
    { id: "Cardiologist", group: 4 },

    { id: "Corporate Lawyer", group: 5 },

    { id: "Mechanical Engineer", group: 6 }
  ],

  links: [
    { source: "CAREERS", target: "Tech" },
    { source: "CAREERS", target: "Finance" },
    { source: "CAREERS", target: "Medical" },
    { source: "CAREERS", target: "Law" },
    { source: "CAREERS", target: "Engineering" },

    { source: "Tech", target: "Software Engineer" },
    { source: "Tech", target: "AI Engineer" },
    { source: "Tech", target: "Cloud Architect" },

    { source: "Finance", target: "Investment Banker" },
    { source: "Finance", target: "Quant Trader" },

    { source: "Medical", target: "Surgeon" },
    { source: "Medical", target: "Cardiologist" },

    { source: "Law", target: "Corporate Lawyer" },

    { source: "Engineering", target: "Mechanical Engineer" }
  ]
}

// APPLY GRAPH
Graph
  .graphData(data)

  // COLORS
  .nodeAutoColorBy('group')

  // LABELS
  .nodeLabel(node => node.id)

  // GLOW NODE STYLE
  .nodeThreeObject(node => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        color: getColor(node.group)
      })
    )
    sprite.scale.set(8, 8)
    return sprite
  })

  // LINKS
  .linkWidth(1.5)
  .linkOpacity(0.4)

  // CLICK ZOOM
  .onNodeClick(node => {
    const distance = 80
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    Graph.cameraPosition(
      {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio
      },
      node,
      1000
    )
  })

// 🔥 ZOOM FIX (IMPORTANT)
Graph.controls().minDistance = 50
Graph.controls().maxDistance = 1000
Graph.controls().zoomSpeed = 2

// 🎨 COLORS (WINE THEME)
function getColor(group) {
  const colors = {
    0: "#ffffff",
    1: "#ff0066",
    2: "#ff4da6",
    3: "#cc0052",
    4: "#99003d",
    5: "#660029",
    6: "#330014"
  }
  return colors[group] || "#ffffff"
}
