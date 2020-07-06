import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Item({ title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default Item

const styles = StyleSheet.create({})