import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import React from 'react';

export default function AuthHeader() {
    return (
        <View>
            <View style={{ flex: 1 / 4, alignItems: 'center', marginBottom: 20 }}>
                <Image
                    style={styles.stretch}
                    source={require('../../assets/books_logo.png')}
                />
                <Text style={{ paddingTop: 10 }}>WELCOME TO THE BOOKS COLLECTION</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        paddingTop: 50,
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
    },
});