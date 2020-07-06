import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import Axios from 'axios';
import Item from '../components/Item';

const Home = ({ navigation }) => {

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

    const fetchNewData = () => {
        setPageCount(pageCount + 1);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.column}>Title</Text>
                <Text style={styles.column}>Url</Text>
                <Text style={styles.column}>Creatd At</Text>
                <Text style={styles.column}>Author</Text>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Item
                        title={item.title}
                        url={item.url}
                        created_at={item.created_at}
                        author={item.author}
                        navigation={navigation}
                        data={item}
                    />
                )}
                keyExtractor={item => item.objectID}
                onEndReached={fetchNewData}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    column: {
        width: '25%',
        borderLeftColor: 'black',
        borderLeftWidth: 1,
        padding: 5,
        fontWeight: 'bold'
    }
});

export default Home
