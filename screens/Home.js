import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import Axios from 'axios';
import Constants from 'expo-constants';
import Item from '../components/Item';

const Home = () => {

    const [pageCount, setPageCount] = useState(0);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        Axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0').then(res => {
            setPosts(res.data.hits);
        })
        const intervalId = setInterval(() => {
            setPageCount(pageCount => pageCount + 1)
        }, 10000);
        return () => {
            clearInterval(intervalId)
        }
    }, []);

    useEffect(() => {

    }, [pageCount])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Display the title, URL, created_at, and author of each post in a table */}
            <FlatList
                data={posts}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.objectID}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
    }
});

export default Home
