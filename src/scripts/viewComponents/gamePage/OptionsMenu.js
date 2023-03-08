import PubSubInterface from "../../PubSubInterface";
import elem from "../elem";

export default class OptionsMenu extends PubSubInterface {
    constructor(viewModel, element) {
        super(viewModel, element);
    }

    // possible options...
    //
    // theme color
    // stop video
    //

    shouldUpdate(oldModel, newModel) {
        return true;
    }

    render(model) {
        return this.buildOptions(model);
    }

    buildOptions(model) {
        if (model.gameState === "inGame") {
            // maybe add a back button or new game button
        }

        const videoBtn = elem({
            prop: "div",
            id: "videoBtn",
        });

        const videoBtnClass = model.videoPlaying ? "pause" : "play";

        videoBtn.classList.add(videoBtnClass);

        videoBtn.addEventListener("click", (e) => {
            this.viewModel.updateModel((oldModel) => {
                const newModel = { ...oldModel };
                newModel.videoPlaying = !oldModel.videoPlaying;

                return newModel;
            });
        });

        const hueSlider = elem({
            prop: "input",
            type: "range",
            min: "0",
            max: "360",
            value: "120",
            className: "hueSlider",
        });

        hueSlider.addEventListener("input", (e) => {
            const sliderValue = parseInt(e.target.value);
            const root = document.querySelector(":root");
            const startingHue = 120;
            const hueRotation = ((sliderValue - startingHue + 180) % 360) - 180;
            const themeColor = `hsla(${sliderValue}, 100%, 50%, 1)`;
            const lowAlphaColor = `hsla(${sliderValue}, 100%, 50%, 0.5)`;
            const oppositeRotation = (sliderValue - startingHue + 300) % 360;
            const oppositeTheme = `hsla(${oppositeRotation}, 100%, 50%, 1)`;
            const oppositeLowAlphaTheme = `hsla(${oppositeRotation}, 100%, 50%, .5)`;
            const oppositeHueRotate =
                ((oppositeRotation - startingHue + 180) % 360) - 180;

            root.style.setProperty("--theme-color", themeColor);
            root.style.setProperty("--lowAlpha-color", lowAlphaColor);
            root.style.setProperty("--filter", `hue-rotate(${hueRotation}deg)`);
            root.style.setProperty(
                "--opposite-filter",
                `hue-rotate(${oppositeHueRotate}deg)`
            );
            root.style.setProperty("--opposite-color", oppositeTheme);
            root.style.setProperty(
                "--opposite-lowAlpha",
                oppositeLowAlphaTheme
            );
        });

        const slideContainer = elem({
            prop: "div",
            className: "slideContainer",
            children: [hueSlider],
        });

        const optionsHousing = elem({
            prop: "div",
            className: "optionsHousing",
            children: [videoBtn, slideContainer],
        });

        return optionsHousing;
    }
}
