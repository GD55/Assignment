import React from 'react'
import { View, Text } from 'react-native'

const Detail = ({ route }) => {
    const { data } = route.params;

    return (
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    )
}

export default Detail
