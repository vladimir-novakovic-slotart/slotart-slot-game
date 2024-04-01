import { useDispatch } from 'react-redux';
import { settingsClicked, soundClicked, infoClicked, spinClicked } from './GameActions';

export const useGameActionsDispatcher = () => {
    const dispatch = useDispatch();

    const handleSettingsClick = () => dispatch(settingsClicked());
    const handleSoundClick = () => dispatch(soundClicked());
    const handleInfoClick = () => dispatch(infoClicked());
    const handleSpinClick = () => dispatch(spinClicked());

    return {
        handleSettingsClick,
        handleSoundClick,
        handleInfoClick,
        handleSpinClick,
    };
};
