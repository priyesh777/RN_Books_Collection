/* Books Collection, Chandrika Ghale, 200575692, 4/4/2024
Priyesh Gautam, 200568939,4/4/2024
*/
import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../theme/theme';

/* Reusable component used for implementing the input fields through multiple components */
interface Props {
    label: string;
    secureTextEntry: boolean;
    value?: string;
    onChange?: ((text: string) => void);
    descriptionBox?: boolean;
}

const defaultProps: Partial<Props> = {
    secureTextEntry: false,
};

export default function CustomTextInput(props: Props) {
    const {
        label,
        secureTextEntry,
        value,
        onChange,
        descriptionBox,
    } = props;
    return (
        <View style={{ marginVertical: 8 }}>
            <Text>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={styles.textInput}
                value={value}
                onChangeText={onChange}
                numberOfLines={descriptionBox ? 4 : undefined}
            />
        </View>
    );
}

CustomTextInput.defaultProps = defaultProps;

const styles = StyleSheet.create({
    textInput: {
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: colors.textBox,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        height: 50,
        minWidth: '80%',
        paddingHorizontal: 10,
    },
});
