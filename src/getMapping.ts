import getSettings, {ColorRegex} from './getSettings';

export default (path: string): ColorRegex | undefined => {
    const config = getSettings().config;
    if (!config) return undefined;
    
    const map = config.find(mapping => new RegExp(mapping.regex, 'g').test(path));
    if (!map) return undefined;
    return map;
}