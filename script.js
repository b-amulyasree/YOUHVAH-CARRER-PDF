const Graph = ForceGraph3D()(document.getElementById('graph'))

/* DATA STRUCTURE (TREE) */
const data = {
  nodes: [
    { id: "CAREERS", group: 0 },

    // SECTORS
    { id: "Tech", group: 1 },
    { id: "Finance", group: 1 },
    { id: "Medical", group: 1 },
    { id: "Law", group: 1 },
    { id: "Engineering", group: 1 },

    // TECH JOBS
    { id: "Software Engineer", group: 2 },
    { id: "AI Engineer", group: 2 },
    { id: "Cloud Architect", group: 2 },

    // FINANCE JOBS
    { id: "Investment Banker", group: 3 },
    { id: "Quant Trader", group: 3 },

    // MEDICAL
    { id: "Surgeon", group: 4 },
    { id: "Cardiologist", group: 4 },

    // LAW
    { id: "Corporate Lawyer", group: 5 },

    // ENGINEERING
    { id: "Mechanical Engineer", group: 6 }
  ],

  links: [
    // ROOT → SECTORS
    { source: "CAREERS", target: "Tech" },
    { source: "CAREERS", target: "Finance" },
    { source: "CAREERS", target: "Medical" },
    { source: "CAREERS", target: "Law" },
    { source: "CAREERS", target: "Engineering" },

    // TECH → JOBS
    { source: "Tech", target: "Software Engineer" },
    { source: "Tech", target: "AI Engineer" },
    { source: "Tech", target: "Cloud Architect" },

    // FINANCE → JOBS
    { source: "Finance", target: "Investment Banker" },
    { source: "Finance", target: "Quant Trader" },

    // MEDICAL
    { source: "Medical", target: "Surgeon" },
    { source: "Medical", target: "Cardiologist" },

    // LAW
    { source: "Law", target: "Corporate Lawyer" },

    // ENGINEERING
    { source: "Engineering", target: "Mechanical Engineer" }
  ]
}

/* GRAPH CONFIG */
Graph
  .graphData(data)

  /* NODE LOOK */
  .nodeAutoColorBy('group')
  .nodeLabel(node => node.id)

  /* COOL GLOW EFFECT */
  .nodeThreeObject(node => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        color: getColor(node.group)
      })
    )
    sprite.scale.set(8, 8)
    return sprite
  })

  /* LINK STYLE */
  .linkWidth(1.5)
  .linkOpacity(0.4)

  /* CLICK FOCUS */
  .onNodeClick(node => {
    const distance = 80
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z)

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

/* COLOR FUNCTION (WINE STYLE) */
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

