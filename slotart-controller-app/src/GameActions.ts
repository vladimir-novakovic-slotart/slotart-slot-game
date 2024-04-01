// gameactions.ts
export const ActionTypes = {
    SETTINGS_CLICKED: "SETTINGS_CLICKED",
    SOUND_CLICKED: "SOUND_CLICKED",
    INFO_CLICKED: "INFO_CLICKED",
    SPIN_CLICKED: "SPIN_CLICKED",
};

export const settingsClicked = () => ({ type: ActionTypes.SETTINGS_CLICKED });
export const soundClicked = () => ({ type: ActionTypes.SOUND_CLICKED });
export const infoClicked = () => ({ type: ActionTypes.INFO_CLICKED });
export const spinClicked = () => ({ type: ActionTypes.SPIN_CLICKED });
