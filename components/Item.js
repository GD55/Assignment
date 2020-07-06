import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

function Item({ title, url, created_at, author, navigation, data }) {
    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Detail', { data })}>
            <View style={styles.row}>
                <Text style={styles.column}>{title}</Text>
                <Text style={styles.column}>{url}</Text>
                <Text style={styles.column}>{created_at}</Text>
                <Text style={styles.column}>{author}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Item

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    column: {
        width: '25%',
        borderLeftColor: 'black',
        borderLeftWidth: 1,
        padding: 5
    }
})