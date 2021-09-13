
function analyticsVisualization() {
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
        title: "CP TECH RADAR - ANALYTICS",
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
        entries: [ /*
            {
                "quadrant": 3,
                "ring": 0,
                "label": "groovy",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "sql",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "spark",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "tableau",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "zeppelin",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 1,
                "ring": 0,
                "label": "Apache NiFi",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 0,
                "ring": 3,
                "label": "mysql",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 0,
                "label": "greenplum",
                "active": true,
                "moved": 1
            }, */
        ]
        //ENTRIES
    });
}
