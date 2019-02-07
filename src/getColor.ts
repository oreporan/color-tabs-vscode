import getSettings from './getSettings'

export default (path: string) => {
    const config = getSettings().config;
    if (!config) return undefined;
    
    const map = config.find(mapping => new RegExp(mapping.regex, 'g').test(path));
    if (!map) return undefined;
    return map.color;
}