import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
import Axios from 'axios';
import Constants from 'expo-constants';
import Item from '../components/Item';

const Home = () => {

    const [pageCount, setPageCount] = useState(0);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        Axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0').then(res => {
            setPosts(res.data.hits);
        });
        const intervalId = setInterval(() => {
            setPageCount(pageCount => pageCount + 1)
        }, 10000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        pageCount > 0 && Axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`).then(res => {
            setPosts([...posts, ...res.data.hits]);
        });
    }, [pageCount])

    return (
        <SafeAreaView style={styles.container}>
            {/* Display the title, URL, created_at, and author of each post in a table */}
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Item
                        title={item.title}
                        url={item.url}
                        created_at={item.created_at}
                        author={item.author}
                    />
                )}
                keyExtractor={item => item.title}
            />
        </SafeAreaView >
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
