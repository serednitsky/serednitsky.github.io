
function frontendVisualization() {
    clearBox('radar')

    radar_visualization({
        svg_id: "radar",
        width: 1450,
        height: 1000,
        colors: {
            background: "#fff",
            grid: "#bbb",
            inactive: "#ddd"
        },
        title: "CP TECH RADAR - FRONTEND",
        quadrants: [
            { name: "Data Management" },
            { name: "Platform & Infrastructure" },
            { name: "Techniques & Tools" },
            { name: "Languages & Frameworks" },
        ],
        rings: [
            { name: "ADOPT", color: "#15c400" },
            { name: "TRIAL", color: "#3ad2bf" },
            { name: "ASSESS", color: "#fbac00" },
            { name: "HOLD", color: "#ef4c6b" }
        ],
        print_layout: true,
        //ENTRIES
        entries: [
            {
                "quadrant": 3,
                "ring": 3,
                "label": "mvc .net framework",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "KnockoutJs",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "Angular Material",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "PrimeNg",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "TypeScript",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Angular",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Taiga-ui",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "Vue",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "GraphQI",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 2,
                "label": "NuxtJS",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 2,
                "ring": 3,
                "label": "MVC",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "WebStorm",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "VS Code",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "SPA",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 1,
                "label": "MacOS",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 2,
                "ring": 2,
                "label": "SSR",
                "active": true,
                "moved": 1
            },
        ]
        //ENTRIES
    });
}
