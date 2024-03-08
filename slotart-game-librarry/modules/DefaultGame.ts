import * as PIXI from "pixi.js";

export default function createDefaultGame(rootElementId) {
    // todo add symlink to node-modules
    const app = new PIXI.Application({
        background: '#1099bb',
        // resizeTo: window,
    });

    // document.body.appendChild(app.view);
    document.getElementById(rootElementId).appendChild(app.view);
}