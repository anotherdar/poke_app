import * as React from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounce } from '../../hooks/useDebounce/index';

type Props = {
    style?: StyleProp<ViewStyle>
    onDebounce: (value: string) => void
}

export const SearchInput: React.FC<Props> = (props) => {
    const [userInput, setUserInput] = React.useState<string>('');
    const { debouncedValue } = useDebounce({
        input: userInput,
        time: 500
    });
    React['useEffect'](() => {
        props.onDebounce(debouncedValue)
    }, [debouncedValue])
    return (
        <View style={[props.style]}>
            <View style={[inputStyles.inputContainer]}>
                <TextInput
                    style={[inputStyles.input]}
                    placeholder='Search pokemon'
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholderTextColor='gray'
                    value={ userInput }
                    onChangeText={ setUserInput }
                />

                <Icon name='search-outline' size={24} color='#ffaa00'/>
            </View>
        </View>
    )
}

const inputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#333',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#121212',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 50,
        
        elevation: 15,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#fff'
    }
})