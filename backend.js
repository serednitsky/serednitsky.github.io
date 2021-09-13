

function backendVisualization() {

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
        title: "CP TECH RADAR - BACKEND",
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
                "label": "C# 8",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 0,
                "label": "Dotnet Core 3.1",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "GraphQL",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": ".Net 5",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 1,
                "label": "C# 9",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 3,
                "ring": 2,
                "label": "F#",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": ".NET Framework 4.6.2",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": ".NET Core 2.1",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "NHibernate",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "EntityFramework",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "WCF",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 3,
                "ring": 3,
                "label": "Nancy",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Serilog",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Swagger",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "XUnit/NUnit",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Masstransit",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Quartz",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Hangfire",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "CQRS",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "DDD",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 2,
                "ring": 0,
                "label": "Rider",
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
                "ring": 3,
                "label": "Windows 10",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 0,
                "label": "Mongo DB",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 0,
                "label": "RabbitMQ",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 0,
                "label": "Consul",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 2,
                "label": "Cassandra",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 2,
                "label": "Kafka",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 2,
                "label": "PostgreSQL",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 3,
                "label": "Redis",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 0,
                "ring": 3,
                "label": "MS SQL",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 1,
                "ring": 0,
                "label": "Docker",
                "active": true,
                "moved": 0
            },
            {
                "quadrant": 1,
                "ring": 1,
                "label": "CentOS",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 1,
                "ring": 0,
                "label": "IdentityServer",
                "active": true,
                "moved": 1
            },
            {
                "quadrant": 1,
                "ring": 3,
                "label": "Windows Server 2016",
                "active": true,
                "moved": 0
            },*/
        ]
        //ENTRIES
    });
}