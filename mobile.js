
function mobileVisualization() {
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
        title: "CP TECH RADAR - MOBILE",
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
                "label": "Java",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Kotlin",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Objective-C",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Swift",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "XML",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "ReactiveX",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "AndroidViewModel",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "Dagger2",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "Hilt",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Retrofit",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Room database",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Android SDK",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "iOS SDK",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Gradle",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "CocoaPods",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Git",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 1,
                "label": "JitPack",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 0,
                "label": "SQLite",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 1,
                "ring": 0,
                "label": "iOS",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 1,
                "ring": 0,
                "label": "Android",
                "active": true,
                "moved": 0
            }, */
        ]
        //ENTRIES
    });
}
