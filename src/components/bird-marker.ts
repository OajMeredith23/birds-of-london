import { type Bird } from "../types/e-bird";
export class BirdMarker {
    bird: Bird;

    constructor(bird: Bird) {
        this.bird = bird;
    }
    render() {

        const el = document.createElement('div');
        el.className = 'marker';
        return el;
    }
}