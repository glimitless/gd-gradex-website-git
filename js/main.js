/*
    ----------------------------------------------------------------------------
    APPLICATION OVERVIEW (main.js)
    ----------------------------------------------------------------------------
    This file owns the full client-side behavior for the prototype:

    1) DATA LAYER
       - `sampleItems` is the source-of-truth list for all works shown in the
         archive grid.
       - Each object describes both the grid card and preview window content.

    2) RENDER LAYER
       - `populateGrid()` creates card markup and injects it into `.grid-container`.
       - Grid cards are not hardcoded in HTML; they are generated from data.

    3) VISUAL SHAPE SYSTEM
       - `applyRandomCutShapes()` assigns each thumbnail a unique irregular
         polygon through CSS custom properties.
       - On hover, CSS transitions from random silhouette to full square.

    4) WINDOWING SYSTEM
       - Clicking a thumbnail spawns a floating preview window (`createPreviewWindow`).
       - Multiple windows can exist simultaneously.
       - Most recently created/interacted window is brought to front via z-index.
       - Window header supports dragging (`setupPreviewWindowDragging`).
       - Native CSS resize is enabled by stylesheet (`resize: both`).
       - Clicking the close icon removes only that window.
       - When a window is opened, the thumbnail remains expanded until the last window for that item is closed.

    5) STARTUP
       - Final line `populateGrid(sampleItems)` bootstraps the page.
*/

/*
    ----------------------------------------------------------------------------
    1) DATA SOURCE
    ----------------------------------------------------------------------------
*/
// Source data for each tile in the object: sampleItems.
const sampleItems = [
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Hana Abdelrazik",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Sophia Adams",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aiyana Alzamora",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Nadege Amegbeto",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Kaley Anderson- Peddigrew",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Atasha Aquino",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Nehir Ay",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Barbod Bazargani",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Chloe Bowes",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aiden Brouckxon",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Warrick Bruan",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Gian Cambridge",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Mandy Chang",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Phil Charest",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Claudia Cheon",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Priscilla Chung",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Nicholas Cox",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Xhilda Çuko",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aya David",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Laura De Micheli",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Sanchari Dey",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Isabella Durazo Linacre",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Brianna Dusseault",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Emma Ferreira",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Celine Fu",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "He Julia",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Levi Hwang",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Vidhi Khurana",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Doyeon Kim",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jude Kim",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Yathusa Kuladevan",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Kim Ly Lam",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Vanessa Lalvani",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jun Lee",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Rachel Leung",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Lin, Ynes",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Kerina Liu",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Alexandra Maftei",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Chloé Mailloux",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Isaiah Sta. Maria",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jaelycka Martinez",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Lizzie Metropolyt",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Olivia Miele",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Amani Mohamed",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Cao Nancy",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Neshat Neishabouri",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aila Neil",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Amir Nevis",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aaryan Pashine",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Olivia Picariello",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jaz Poole",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Matteo Prete",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Lindsay Quintal",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Joshua Reginales",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Nathan Reswara",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Ethan Robin",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Andrei Rodriguez",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jiordan Roque",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Sergio Santolo",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Madison Schneider",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Elaisha Senewiratne",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Aitareya Sethi",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Cleya Shi",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Tanveer Singh",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Angadbir Sran",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jiang Sunny",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Turba Tahir",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Cindy Tran",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Michelle Tran",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Daniel Vrbos",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Olivia Wideman",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Kelli Wood",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Cindy Xue",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Ashley Yip",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Alex Yu",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Salam Zakarya",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Jia Xiang Selina Zheng",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    },
    {
        thumbnail: "./images/gray-square.jpg",
        artistName: "Iman Zuberi",
        workName: "[insert-work-name]",
        projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        documentationLink: "https://example.com/projects/",
    }
];

const GRID_ITEM_SELECTOR = ".grid-item";
const THUMBNAIL_SELECTOR = ".grid-item-thumbnail";
const PREVIEW_PADDING = 8;
const FULL_CLIP_PATH = createFullSquareClipPath(24);

const gridContainer = document.querySelector(".grid-container");
const searchInput = document.querySelector("#archive-search");

let highestPreviewWindowZIndex = 10;
let previewWindowOpenCount = 0;
const randomClipPathByItemIndex = new Map();
const openPreviewCountByItemIndex = new Map();

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function isValidItemIndex(itemIndex) {
    return Number.isInteger(itemIndex) && itemIndex >= 0;
}

function createCircularCutClipPath(points = 24) {
    const baseRadius = getRandomInRange(38, 45);
    const variation = getRandomInRange(4, 10);
    const coords = [];

    for (let i = 0; i < points; i += 1) {
        const angle = (Math.PI * 2 * i) / points;
        const radius = baseRadius + getRandomInRange(-variation, variation);
        const x = clamp(50 + Math.cos(angle) * radius, 2, 98);
        const y = clamp(50 + Math.sin(angle) * radius, 2, 98);
        coords.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
    }

    return `polygon(${coords.join(", ")})`;
}

function createFullSquareClipPath(points) {
    const coords = [];
    for (let i = 0; i < points; i += 1) {
        const angle = (Math.PI * 2 * i) / points;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const scale = 50 / Math.max(Math.abs(dx), Math.abs(dy));
        coords.push(
            `${clamp(50 + dx * scale, 0, 100).toFixed(2)}% ${clamp(50 + dy * scale, 0, 100).toFixed(2)}%`
        );
    }
    return `polygon(${coords.join(", ")})`;
}

function getRandomClipPathForItem(itemIndex) {
    if (!isValidItemIndex(itemIndex)) return createCircularCutClipPath();
    if (!randomClipPathByItemIndex.has(itemIndex)) {
        randomClipPathByItemIndex.set(itemIndex, createCircularCutClipPath());
    }
    return randomClipPathByItemIndex.get(itemIndex);
}

function setThumbnailExpandedState(itemIndex, shouldExpand) {
    if (!isValidItemIndex(itemIndex)) return;
    const thumbnail = document.querySelector(
        `${GRID_ITEM_SELECTOR}[data-item-index="${itemIndex}"] ${THUMBNAIL_SELECTOR}`
    );
    if (!thumbnail) return;
    thumbnail.classList.toggle("grid-item-thumbnail--pinned-open", shouldExpand);
}

function updateOpenPreviewCount(itemIndex, delta) {
    if (!isValidItemIndex(itemIndex) || delta === 0) return;
    const nextCount = Math.max(0, (openPreviewCountByItemIndex.get(itemIndex) || 0) + delta);
    if (nextCount === 0) {
        openPreviewCountByItemIndex.delete(itemIndex);
    } else {
        openPreviewCountByItemIndex.set(itemIndex, nextCount);
    }
    setThumbnailExpandedState(itemIndex, nextCount > 0);
}

function applyRandomCutShapes() {
    if (!gridContainer) return;
    gridContainer.querySelectorAll(GRID_ITEM_SELECTOR).forEach((gridItem) => {
        const thumbnail = gridItem.querySelector(THUMBNAIL_SELECTOR);
        if (!thumbnail) return;
        const itemIndex = Number(gridItem.dataset.itemIndex);
        thumbnail.style.setProperty("--clip-random", getRandomClipPathForItem(itemIndex));
        thumbnail.style.setProperty("--clip-full", FULL_CLIP_PATH);
    });
}

function bringPreviewWindowToFront(previewWindow) {
    highestPreviewWindowZIndex += 1;
    previewWindow.style.zIndex = String(highestPreviewWindowZIndex);
}

function getPreviewWindowStartPosition() {
    const sequenceOffset = (previewWindowOpenCount % 10) * 25;
    previewWindowOpenCount += 1;
    return {
        left: clamp(25 + sequenceOffset, PREVIEW_PADDING, window.innerWidth - 220),
        top: clamp(25 + sequenceOffset, PREVIEW_PADDING, window.innerHeight - 220),
    };
}

function setupPreviewWindowDragging(previewWindow, dragHandle) {
    dragHandle.style.cursor = "move";
    dragHandle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        if (event.target.closest(".preview-window-close, .preview-window-link")) return;

        const startX = event.clientX;
        const startY = event.clientY;
        const startLeft = previewWindow.offsetLeft;
        const startTop = previewWindow.offsetTop;
        let rafId = null;
        let pendingLeft = startLeft;
        let pendingTop = startTop;

        bringPreviewWindowToFront(previewWindow);
        dragHandle.setPointerCapture(event.pointerId);

        const flushPosition = () => {
            previewWindow.style.left = `${pendingLeft}px`;
            previewWindow.style.top = `${pendingTop}px`;
            rafId = null;
        };

        const onPointerMove = (moveEvent) => {
            const maxLeft = Math.max(
                PREVIEW_PADDING,
                window.innerWidth - previewWindow.offsetWidth - PREVIEW_PADDING
            );
            const maxTop = Math.max(
                PREVIEW_PADDING,
                window.innerHeight - previewWindow.offsetHeight - PREVIEW_PADDING
            );
            pendingLeft = clamp(startLeft + (moveEvent.clientX - startX), PREVIEW_PADDING, maxLeft);
            pendingTop = clamp(startTop + (moveEvent.clientY - startY), PREVIEW_PADDING, maxTop);
            if (rafId === null) rafId = window.requestAnimationFrame(flushPosition);
        };

        const stopDragging = () => {
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
                flushPosition();
            }
            dragHandle.releasePointerCapture(event.pointerId);
            dragHandle.removeEventListener("pointermove", onPointerMove);
            dragHandle.removeEventListener("pointerup", stopDragging);
            dragHandle.removeEventListener("pointercancel", stopDragging);
        };

        dragHandle.addEventListener("pointermove", onPointerMove);
        dragHandle.addEventListener("pointerup", stopDragging);
        dragHandle.addEventListener("pointercancel", stopDragging);
    });
}

function createPreviewWindow({ src, alt, title, description, documentationLink, itemIndex }) {
    const previewWindow = document.createElement("section");
    previewWindow.className = "preview-window";

    const header = document.createElement("header");
    header.className = "preview-window-header";

    const titleEl = document.createElement("p");
    titleEl.className = "preview-window-title";
    titleEl.textContent = title;

    const closeButton = document.createElement("button");
    closeButton.className = "preview-window-close";
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", `Close preview for ${title}`);

    const content = document.createElement("div");
    content.className = "preview-window-content";

    const image = document.createElement("img");
    image.className = "preview-window-image";
    image.src = src;
    image.alt = alt;

    const details = document.createElement("div");
    details.className = "preview-window-details";

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "preview-window-description";
    descriptionEl.textContent = description || "No project description provided.";

    const linkIntroEl = document.createElement("p");
    linkIntroEl.className = "preview-window-link-intro";
    linkIntroEl.textContent = "See the full project documentation at the link below:";

    const linkEl = document.createElement("a");
    linkEl.className = "preview-window-link";
    linkEl.href = documentationLink || "#";
    linkEl.target = "_blank";
    linkEl.rel = "noopener noreferrer";
    linkEl.textContent = documentationLink ? `${documentationLink} ↗` : "Documentation link unavailable";

    const { left, top } = getPreviewWindowStartPosition();
    previewWindow.style.left = `${left}px`;
    previewWindow.style.top = `${top}px`;

    details.append(descriptionEl, linkIntroEl, linkEl);
    content.append(image, details);
    header.append(titleEl, closeButton);
    previewWindow.append(header, content);
    document.body.appendChild(previewWindow);

    updateOpenPreviewCount(itemIndex, 1);
    bringPreviewWindowToFront(previewWindow);
    setupPreviewWindowDragging(previewWindow, header);

    previewWindow.addEventListener("mousedown", () => bringPreviewWindowToFront(previewWindow));
    closeButton.addEventListener("pointerdown", (event) => event.stopPropagation());
    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        updateOpenPreviewCount(itemIndex, -1);
        previewWindow.remove();
    });
}

function populateGrid(items) {
    if (!gridContainer) return;
    gridContainer.innerHTML = items.map(({ item, sourceIndex }) => `
        <article class="grid-item" data-item-index="${sourceIndex}">
            <img class="grid-item-thumbnail" src="${item.thumbnail}" alt="${item.workName}">
            <h3 class="grid-item-heading">${item.artistName}</h3>
            <p class="grid-item-work-name">${item.workName}</p>
        </article>
    `).join("");

    applyRandomCutShapes();
    openPreviewCountByItemIndex.forEach((count, sourceIndex) => {
        setThumbnailExpandedState(sourceIndex, count > 0);
    });
}

function setupThumbnailWindowLauncher() {
    if (!gridContainer || gridContainer.dataset.previewLauncherReady === "true") return;

    gridContainer.addEventListener("click", (event) => {
        const thumbnail = event.target.closest(THUMBNAIL_SELECTOR);
        if (!thumbnail || !gridContainer.contains(thumbnail)) return;

        const gridItem = thumbnail.closest(GRID_ITEM_SELECTOR);
        const itemIndex = Number(gridItem?.dataset.itemIndex);
        const selectedItem = isValidItemIndex(itemIndex) ? sampleItems[itemIndex] : null;

        const artistName = gridItem?.querySelector(".grid-item-heading")?.textContent?.trim() || "Artwork";
        const workName = gridItem?.querySelector(".grid-item-work-name")?.textContent?.trim() || "";
        const title = workName ? `${artistName} - ${workName}` : artistName;

        createPreviewWindow({
            src: thumbnail.src,
            alt: thumbnail.alt || title,
            title,
            description: selectedItem?.projectDescription || "",
            documentationLink: selectedItem?.documentationLink || "",
            itemIndex,
        });
    });

    gridContainer.dataset.previewLauncherReady = "true";
}

function getFilteredItems(query) {
    const normalizedQuery = query.trim().toLowerCase();
    return sampleItems
        .map((item, sourceIndex) => ({ item, sourceIndex }))
        .filter(({ item }) => {
            if (!normalizedQuery) return true;
            return (
                item.artistName.toLowerCase().includes(normalizedQuery) ||
                item.workName.toLowerCase().includes(normalizedQuery)
            );
        });
}

function setupSearchFilter() {
    if (!searchInput) return;
    searchInput.addEventListener("input", (event) => {
        populateGrid(getFilteredItems(event.target.value || ""));
    });
}

setupThumbnailWindowLauncher();
setupSearchFilter();
populateGrid(getFilteredItems(""));
