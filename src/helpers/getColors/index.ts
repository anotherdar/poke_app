import ImageColors from 'react-native-image-colors';

export const getColors = async (uri: string) => {
    const colors = await ImageColors.getColors(uri)
    let primary: string = '';
    let secondary: string = '';

    if (colors.platform === "android") {
        primary = colors.dominant as string;
        secondary = colors.darkVibrant as string;
    } else {
        primary = colors.primary as string;
        secondary = colors.secondary as string;
    }

    return [primary, secondary]
}