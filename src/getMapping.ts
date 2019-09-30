import getSettings, {ColorRegex} from './getSettings';
import generateColorFromString from './generateColorFromString';

export default (path: string): ColorRegex | undefined => {
    const config = getSettings().config;
    if (!config || config.length < 1) return undefined;

    const map = config.find(mapping => new RegExp(mapping.regex, 'g').test(path));
    if (!map) return undefined;
    return ({
        ...map,
        color: map.color || generateColorFromString(map.regex)
    });
}